import { CompileContainer } from "./Compile.style";
// import axios from "axios";


function Compile({ result }) {
    // const RESULT = axios.create({
    //     baseURL: "http://13.209.68.42:8083"
    // })

    // const excuteCode = async(language, sourceCode) => {
    //     const response = await RESULT.post('', {
    //         'language': language,
    //         'files' : [
    //             { 
    //                 'content' : sourceCode,
    //             },
    //         ],
    //     });

    //     return response.data;
    // }

    return (
        <CompileContainer>
            {result ? result.map((line, idx) => <p key={idx}>{line}</p>) : ''}
        </CompileContainer>
    );
}

export default Compile;