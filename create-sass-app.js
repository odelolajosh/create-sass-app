const fs = require('fs')
const path = require('path')

// TEMPLATE FOR THE SASS FOLDER
const SOURCE_DIR = path.join(__dirname, 'src')

const mainDir = `./sass`
const cssDir = `./css`
const pathArray = [
  ['abstracts', ['_variables.scss', '_mixins.scss', '_functions.scss']],
  [
    'base',
    [
      '_variables.scss',
      '_reset.scss',
      '_typography.scss',
      '_animations.scss',
      '_utilities.scss',
    ],
  ],
  ['components', ['_buttons.scss', '_card.scss', '_form.scss']],
  ['layouts', ['_navigation.scss', '_header.scss', '_footer.scss']],
  ['pages', ['_home.scss', '_header.scss', '_footer.scss']],
  ['themes', ['_pink.scss', '_mint.scss']],
  ['vendors', ['_icons.scss']],
]

/**
 * copies content from the source directory to the target directory
 * @param {string} source where the files are located
 * @param {string} target where the files are to be copied to
 */
const copyToDirectory = (source, target) => {
  const content = fs.readdirSync(source)

  content.forEach((file) => {
    const sourceFile = path.join(source, file)
    const targetFile = path.join(target, file)

    const stat = fs.statSync(sourceFile)

    if (stat.isFile()) {
      fs.copyFileSync(sourceFile, targetFile)
    } else {
      if (!fs.existsSync(targetFile)) {
        fs.mkdirSync(targetFile)
      }
      copyToDirectory(sourceFile, targetFile)
    }
  })
}

/**
 * create sass from template source code
 * @param {string} target while the sass sources to be copied to
 */
exports.createSass = (target) => {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target)
  }
  copyToDirectory(SOURCE_DIR, target)
}

const createSass = async () => {
  //CREATE SASS FOLDER
  fs.mkdir(mainDir, { recursive: true }, (err) => {
    //LOOP THROUGH THE PATH ARRAY AND CREATE A FOLDER FOR EACH PATH
    pathArray.forEach((el) => {
      const folderPath = `${mainDir}/${el[0]}`
      //LOOP THROUGH THE NEW FOLDER CREATED AND CREATE A THE FILES REPRESENTED FOR THEM
      fs.mkdir(folderPath, { recursive: true }, (err) => {
        el[1].forEach((cur) => {
          fs.writeFile(`${folderPath}/${cur}`, ' ', (err) => {
            console.log('Folders & Files Created')
          })
        })
      })
    })
    //CREATE MAIN SASS FILE
    fs.writeFile(
      `${mainDir}/main.scss`,
      '/*Import all your sass files here*/',
      (err) => {
        console.log('No Error, Start Building')
      },
    )
  })
  //CREATE CSS FOLDER AND MAIN STYLESHEET
  fs.mkdir(cssDir, { recursive: true }, (err) => {
    fs.writeFile(
      `${cssDir}/style.css`,
      '/*Write your css files here*/',
      (err) => {
        console.log('No Error, Start Building')
      },
    )
  })
}

// RUN THE FUNCTION ONLY WHEN THE FILE IS RUN
if (require.main === module) {
  createSass()
}
