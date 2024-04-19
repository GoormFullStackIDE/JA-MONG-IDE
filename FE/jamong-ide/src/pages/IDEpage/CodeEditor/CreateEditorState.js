import { basicSetup } from 'codemirror';
import { EditorState, Compartment } from '@codemirror/state';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
// import { githubLight } from '@uiw/codemirror-theme-github';

export const createEditorState = (language) => {
    const nowLanguage = new Compartment();
    const themeExtension = vscodeDark;
    // 언어에 따른 에디터 확장 선택 함수
    const EXTENSIONS = {
        python: python(),
        javascript: javascript(),
        typescript: javascript({ typescript: true }),
        jsx: javascript({ jsx: true }),
        tsx: javascript({ jsx: true, typescript: true }),
        'c++': cpp(),
        java: java(),
    };

    const selectedLanguage = EXTENSIONS[language] || EXTENSIONS['python'];
    const state = EditorState.create({
        doc: '// hello jamong-ide',
        extensions: [
            themeExtension,
            basicSetup,
            nowLanguage.of(selectedLanguage),
        ],
    });
    return state;
};
