import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../database/firebaseAction";
import { getAllProjects } from "../database/firebaseConfig";
import { useNetInfo } from "@react-native-community/netinfo";

const  ProjectProvider = createContext();

export default function ProjectsContext({children}) {
    const netInfo = useNetInfo()
    
    const [projects, setProjects] = useState([])
    const [loadingProjects, setLoadingProjects] = useState(false);
    const [isConnected, setIsConnected] = useState(true); // Estado para la conexión
    
    const { user, loading } = useAuth();

    useEffect(() => {
        // setIsConnected(netInfo.isInternetReachable)
      
        if (user) {
            loadProjects();
        }
      }, [user]);

      // async function saveProjectsLocal(allProjects) {

      // }
      // async function getProjectsLocal() {
        
      // }

      async function loadProjects() {
        setLoadingProjects(true);
        try {
          const allProjects = await getAllProjects(user.uid);
          console.log(allProjects)

          if(allProjects){
            setProjects(allProjects);
          }else{
            console.warn("No se encontro ningun proyecto ");        
          }
        } catch (error) {
          console.error(error);
        } 
        finally {
          setLoadingProjects(false);
        }
      }
    
      function addProject(newProject) {
        setProjects((prevProjects) => [...prevProjects, newProject]);
      }
    
    return(
        <ProjectProvider.Provider value={{projects, setProjects,loadProjects, addProject, loadingProjects, netInfo}}>
            {children}   
        </ProjectProvider.Provider>
    );
};

export const useProjectsContext = () => useContext(ProjectProvider);
