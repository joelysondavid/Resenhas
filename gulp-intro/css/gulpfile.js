const { series, src, dest } = require('gulp')
const g = require('gulp-load-plugins')() //carrega todos os plugins instalados que tem o prefixo gulp-*
 
const files = {
    scssFile: 'src/sass/index.scss',
    htmlFile: 'src/index.html'
}
 
async function scssTask() {
    src(files.scssFile)
        .pipe(g.sourcemaps.init()) // primeiro inicializa o sourcemaps
        .pipe(g.sass().on('error', g.sass.logError))
        .pipe(g.uglifycss({ "uglyComments": true }))
        .pipe(g.concat('estilo.min.css'))
        .pipe(g.sourcemaps.write('.')) // escreve o arquivo sourcemaps no diretório corrente
        .pipe(dest('build/css'))
}
 
async function copyHtml() {
    src(files.htmlFile)
        .pipe(dest('build'))
}
 
exports.default = series(copyHtml, scssTask)