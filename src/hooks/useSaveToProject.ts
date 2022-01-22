import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from ".";
import {addProjectToDB} from "../database";
import {fetchProjectsAction} from "../redux/actions/creators/projectsActionCreators";
import {Selectors} from "../redux/selectors/selectors";
import {EStatus} from "../types/types";
import usePreviewSize from "./usePreviewSize";

export default function useSaveToProject(
  status: EStatus,
  nameProject: string,
  descProject: string,
  setStatus: (status: EStatus) => void,
) {
  const dispatch = useAppDispatch();

  const [project, setProject] = useState({});
  const [imageBase64, setImageBase64] = useState("");

  const previewSize = usePreviewSize();
  const refTemplate = useAppSelector(state => state.save.refTemplate);
  const allOptions = useAppSelector(Selectors.getAllOptions);

  useEffect(() => {
    if (refTemplate && previewSize.width) {
      (refTemplate.current as any).toDataURL(
        async (base64: string) => {
          setImageBase64(base64);
        },
        {width: previewSize.width, height: previewSize.height},
      );
    }
  }, [refTemplate, previewSize.width]);

  useEffect(() => {
    const totalOptions = {
      ...allOptions,
      image: imageBase64,
      imageSize: [previewSize.width, previewSize.height],
      title: nameProject || "Классика #1",
      desc: descProject || "На день рождения кота",
    };

    setProject(totalOptions);
  }, [nameProject, descProject, imageBase64, allOptions, previewSize.width]);

  useEffect(() => {
    if (status === EStatus.Loading) {
      console.log("Start to save in DB");

      console.log({project});

      try {
        addProjectToDB(project)
          .then(() => {
            setStatus(EStatus.Done);
            // Обновляем список всех проектов
            dispatch(fetchProjectsAction());
          })
          .catch(() => setStatus(EStatus.Error));
      } catch (e) {
        console.log(e);
        setStatus(EStatus.Error);
      }
    }
  }, [status, project]);
}
