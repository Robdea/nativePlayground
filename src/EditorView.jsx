import { useEffect, useState } from "react";
import { StyleSheet, Text, View} from 'react-native';
import { Playgrounds } from "./components/Playgrounds.jsx";
import { StatusBar } from "expo-status-bar";
import { TemplatePageWeb } from "./components/TemplatePageWeb.jsx";
import { GlobalContextPlayground } from "./context/contexts.jsx";
import { getContet, writeCode } from "./database/firebaseConfig.js";
import { getInfoUser, useAuth } from "./database/firebaseAction.js";

export default function EditorView({id}) {
    const [html, setHtml] = useState("");
    const [css, setCss] = useState("");
    const [js, setJs] = useState("");
    const [preview, setPreview] =useState('');

    // const {user,loading} = useAuth()
    const {userInfo,loading} = getInfoUser()

    useEffect(()=>{
        const fetchCode = async () => {
            try{
                const code = await getContet(userInfo.userId, id);

                if(code){
                    setHtml(code.html || "");
                    setCss(code.css || "");
                    setJs(code.js || "");
                }

            }catch(e){
                console.error(e);
            }
        };

        if(userInfo){
            fetchCode();
        }

    },[userInfo])


    const generateDocHtml = async () =>{
        const documentHtml = `
        <html>
            <head>
                <style>${css}</style>
            </head>
            <body>
                ${html}
                <script>${js}</script>
            </body>
        </html>
        `;
        setPreview(documentHtml);

            const currentDate = new Date()
            await writeCode(userInfo.userId, id, html, js, css,currentDate); 
    };


    return(
        <GlobalContextPlayground.Provider  value={{html, setHtml, js, setJs, css, setCss, generateDocHtml, preview}}>
            <View style={styles.container}>
                <View>
                    <TemplatePageWeb style={styles.halfScreen}/>
                    <Playgrounds style={styles.halfScreen} />
                </View>

            </View>
        </GlobalContextPlayground.Provider>

    );

};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0fd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerEditor: {
    flex:1,
    flexDirection: "column",
    width: "100%"
  },
  halfScreen:{
    flex:1,
    margin:2,
  }
});

