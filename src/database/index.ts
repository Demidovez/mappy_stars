// import Realm from "realm";
import {ITemplate} from '../types/types';
import ProjectSchema from './ProjectSchema';

// let realm = new Realm({schema: [ProjectSchema], schemaVersion: 1});

const getProjectsFromDB = () => {
  // return realm.objects("Project");
  return [];
};

// const addProjectToDB = (project: any) => {
//   return new Promise((resolve, reject) => {
//     realm.write(() => {
//       const savedProject = realm.create("Project", {
//         id: new Date().getTime(),
//         ...project,
//       } as ITemplate);

//       if (savedProject) {
//         resolve(true);
//       } else {
//         reject();
//       }
//     });
//   });
// };

// export default realm;
export {getProjectsFromDB};
// export {getProjectsFromDB, addProjectToDB};
