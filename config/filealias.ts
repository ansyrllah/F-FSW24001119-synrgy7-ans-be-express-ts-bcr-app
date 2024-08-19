import moduleAlias from 'module-alias';

const dirConfig: string = __dirname.replace("config", "");
const configAlias: void = moduleAlias.addAliases({
  "@Controllers": `${dirConfig}/app/controllers`,
  "@Exceptions": `${dirConfig}/app/exceptions`,
  "@Interfaces": `${dirConfig}/app/intefaces`,
  "@Middlewares": `${dirConfig}/app/middlewares`,
  "@Models": `${dirConfig}/app/models`,
  "@Repositories": `${dirConfig}/app/repositories`,
  "@Services": `${dirConfig}/app/services`,
  "@Validations": `${dirConfig}/app/validations`,
  "@Config": `${dirConfig}/config`,
  "@Routes": `${dirConfig}/routes`,
});

export default configAlias;