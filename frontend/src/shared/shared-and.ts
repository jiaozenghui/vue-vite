import LDrawers from './ldrawer/index';
const plugins = [LDrawers];

export const setupAntd = (app: any, options = {}) => {
    plugins.forEach((plugin) => {
        app.use(plugin);
    });
}