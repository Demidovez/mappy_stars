import {geoProjection, geoDistance} from "./d3-geo";
import {Kepler} from "./kepler";
import starNamesData from "../star-library/data/starnames.json";

var τ = Math.PI * 2,
  halfπ = Math.PI / 2,
  deg2rad = Math.PI / 180;

export function starSize(width, sizeStars, mag) {
  if (mag === null) return 0.1;
  var r = width * 0.06 * (sizeStars / 100) * Math.exp(-0.28 * (mag + 3));

  return Math.max(r, 0.1);
}

export function planetSize(width, sizeStars, planet) {
  var mag = planet.properties.mag;

  if (mag === null) return 2;
  var r = width * 0.03 * (sizeStars / 100) * Math.exp(-0.05 * Math.min(mag, 2));

  return Math.max(r, 0.1);
}

export function getMST(dt, lng) {
  var yr = dt.getUTCFullYear();
  var mo = dt.getUTCMonth() + 1;
  var dy = dt.getUTCDate();
  var h = dt.getUTCHours();
  var m = dt.getUTCMinutes();
  var s = dt.getUTCSeconds();

  if (mo == 1 || mo == 2) {
    yr = yr - 1;
    mo = mo + 12;
  }

  var a = Math.floor(yr / 100);
  var b = 2 - a + Math.floor(a / 4);
  var c = Math.floor(365.25 * yr);
  var d = Math.floor(30.6001 * (mo + 1));

  // days since J2000.0
  var jd = b + c + d - 730550.5 + dy + (h + m / 60.0 + s / 3600.0) / 24.0;

  // julian centuries since J2000.0
  var jt = jd / 36525.0;

  // the mean sidereal time in degrees
  var mst =
    280.46061837 +
    360.98564736629 * jd +
    0.000387933 * jt * jt -
    (jt * jt * jt) / 38710000 +
    lng;

  // in degrees modulo 360.0
  if (mst > 0.0) while (mst > 360.0) mst = mst - 360.0;
  else while (mst < 0.0) mst = mst + 360.0;

  return mst;
}

export function getAzimutPoint(dt, hor, loc) {
  var alt = hor[0] * deg2rad;
  var az = hor[1] * deg2rad;
  var lat = loc[0] * deg2rad;

  var dec = Math.asin(
    Math.sin(alt) * Math.sin(lat) +
      Math.cos(alt) * Math.cos(lat) * Math.cos(az),
  );

  var ha = (
    (Math.sin(alt) - Math.sin(dec) * Math.sin(lat)) /
    (Math.cos(dec) * Math.cos(lat))
  ).toFixed(6);

  ha = Math.acos(ha);
  ha = ha / deg2rad;

  var ra = getMST(dt, loc[1]) - ha;

  return [ra, dec / deg2rad, 0];
}

export function transformDeg(c, euler) {
  var res = transform(
    c.map(function (d) {
      return d * deg2rad;
    }),
    euler,
  );

  return res.map(function (d) {
    return d / deg2rad;
  });
}

export function transform(c, euler) {
  var x,
    y,
    z,
    β,
    γ,
    λ,
    φ,
    dψ,
    ψ,
    θ,
    ε = 1.0e-5;

  if (!euler) return c;

  λ = c[0]; // celestial longitude 0..2pi
  if (λ < 0) λ += τ;
  φ = c[1]; // celestial latitude  -pi/2..pi/2

  λ -= euler[0]; // celestial longitude - celestial coordinates of the native pole
  β = euler[1]; // inclination between the poles (colatitude)
  γ = euler[2]; // native coordinates of the celestial pole

  x = Math.sin(φ) * Math.sin(β) - Math.cos(φ) * Math.cos(β) * Math.cos(λ);
  if (Math.abs(x) < ε) {
    x = -Math.cos(φ + β) + Math.cos(φ) * Math.cos(β) * (1 - Math.cos(λ));
  }
  y = -Math.cos(φ) * Math.sin(λ);

  if (x !== 0 || y !== 0) {
    dψ = Math.atan2(y, x);
  } else {
    dψ = λ - Math.PI;
  }
  ψ = γ + dψ;
  if (ψ > Math.PI) ψ -= τ;

  if (λ % Math.PI === 0) {
    θ = φ + Math.cos(λ) * β;
    if (θ > halfπ) θ = Math.PI - θ;
    if (θ < -halfπ) θ = -Math.PI - θ;
  } else {
    z = Math.sin(φ) * Math.cos(β) + Math.cos(φ) * Math.sin(β) * Math.cos(λ);
    if (Math.abs(z) > 0.99) {
      θ = Math.abs(Math.acos(Math.sqrt(x * x + y * y)));
      if (z < 0) θ *= -1;
    } else {
      θ = Math.asin(z);
    }
  }

  return [ψ, θ];
}

export var euler = {
  ecliptic: [-90.0 * deg2rad, 23.4393 * deg2rad, 90.0 * deg2rad],
};

export function translate(d, leo) {
  var res = [];

  switch (d.geometry.type) {
    case "Point":
      res = transformDeg(d.geometry.coordinates, leo);
      break;
    case "LineString":
      res.push(transLine(d.geometry.coordinates, leo));
      break;
    case "MultiLineString":
      res = transMultiLine(d.geometry.coordinates, leo);
      break;
    case "Polygon":
      res.push(transLine(d.geometry.coordinates[0], leo));
      break;
    case "MultiPolygon":
      res.push(transMultiLine(d.geometry.coordinates[0], leo));
      break;
  }

  return res;
}

export function transLine(c, leo) {
  var line = [];

  for (var i = 0; i < c.length; i++) line.push(transformDeg(c[i], leo));

  return line;
}

export function transMultiLine(c, leo) {
  var lines = [];

  for (var i = 0; i < c.length; i++) lines.push(transLine(c[i], leo));

  return lines;
}

export function getProjectionMap(raw) {
  var forward;

  forward = function (λ, φ) {
    return raw(-λ, φ);
  };

  forward.invert = function (x, y) {
    try {
      var coords = raw.invert(x, y);
      coords[0] = coords && -coords[0];
      return coords;
    } catch (e) {
      console.log(e);
    }
  };

  return geoProjection(forward);
}

export function starPropername(id, lang) {
  if (!has(starNamesData, id)) return "";

  return has(starNamesData[id], lang)
    ? starNamesData[id][lang]
    : starNamesData[id].name;
}

export function has(o, key) {
  return o !== null && hasOwnProperty.call(o, key);
}

export function getPlanets(d) {
  var planets = [];
  var origin = null;

  for (var key in d) {
    if (!has(d, key)) continue;
    var dat = Kepler().id(key);

    dat.elements(d[key].elements[0]).params(d[key]);

    if (key === "ter") origin = dat;
    else planets.push({planet: dat, color: d[key].color});
  }

  return {planets, origin};
}

export function getPlanetNames(d, lang) {
  var planets = [];
  var origin = null;

  for (var key in d) {
    if (!has(d, key)) continue;
    var dat = Kepler().id(key);

    dat.elements(d[key].elements[0]).params(d[key]);

    if (key === "ter") origin = dat;
    else
      planets.push({
        planet: dat,
        name: has(d[key], lang) ? d[key][lang] : d[key].name,
      });
  }

  return {planets, origin};
}

export function createEntry(o) {
  var res = {type: "Feature", id: o.id, properties: {}, geometry: {}};
  res.properties.name = o["ru"];
  res.properties.symbol = "\u2609";
  res.properties.mag = o.ephemeris.mag || 10;
  if (res.id === "lun") {
    res.properties.age = o.ephemeris.age;
    res.properties.phase = o.ephemeris.phase;
  }
  res.geometry.type = "Point";
  res.geometry.coordinates = o.ephemeris.pos;
  return res;
}

export function clip(coordinates, pos) {
  var geoangle = geoDistance([-coordinates[0], -coordinates[1]], pos);

  if (geoangle > 1.5707963267949) {
    return 0;
  } else {
    return 1;
  }
}

export function getMwbackground(d) {
  var res = {
    type: "FeatureCollection",
    features: [
      {type: "Feature", geometry: {type: "MultiPolygon", coordinates: []}},
    ],
  };

  var l1 = d.geometry.coordinates[0];
  res.features[0].geometry.coordinates[0] = [];
  for (var i = 0; i < l1.length; i++) {
    res.features[0].geometry.coordinates[0][i] = l1[i].slice().reverse();
  }

  return res;
}
