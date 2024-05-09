const { generateTemplateFiles, CaseConverterEnum } = require('generate-template-files');
const path = require('path');

generateTemplateFiles([
    {
        option: 'Component',
        defaultCase: CaseConverterEnum.PascalCase,
        entry: {
            folderPath: path.join(__dirname, './templates/component/'),
        },
        stringReplacers: [{ question: 'Component name ?', slot: '__component__' }],
        output: {
            path: `./src/components/__component__`,
            pathAndFileNameDefaultCase: CaseConverterEnum.PascalCase,
            overwrite: true,
        },
        onComplete: (results) => {
            console.log(results.output.files);
        },
    },
    {
        option: 'Hook',
        defaultCase: CaseConverterEnum.CamelCase,
        entry: {
            folderPath: path.join(__dirname, './templates/hook/'),
        },
        stringReplacers: [{ question: 'Hook name ?', slot: '__name__' }],
        output: {
            path: `./src/hooks/`,
            pathAndFileNameDefaultCase: CaseConverterEnum.KebabCase,
            overwrite: true,
        },
        onComplete: (results) => {
            console.log(results.output.files);
        },
    }
]);