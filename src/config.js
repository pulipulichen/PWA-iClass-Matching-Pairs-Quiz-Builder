let appName = 'PWA-iClass-Matching-Pairs-Quiz-Builder'

let config = {
  version: '20231001-0208',

  view: 'main',
  // resetLocalConfigHour: 0.5
  inputTextExamples: {
    'simple': `cataloguing	為圖書館資料（如書籍、期刊、數位資源）建立有條理且標準化的記錄的過程，包括標題、作者、主題等重要資訊，以便有效檢索和管理。
circulation	包括借閱和追蹤資料在讀者間的移動。這包括借出、歸還、續借、管理到期日和罰款等讀者服務。
information	是圖書館收集、整理和提供的主要標的。其用處是協助讀者做出決策。`,
    'group': `cataloguing	為圖書館資料（如書籍、期刊、數位資源）建立有條理且標準化的記錄的過程，包括標題、作者、主題等重要資訊，以便有效檢索和管理。
circulation	包括借閱和追蹤資料在讀者間的移動。這包括借出、歸還、續借、管理到期日和罰款等讀者服務。
authority control	對於同一主題的不同用詞，給定一個獨特且唯一的款目，以此控制避免多詞同義的狀況。
  
data	文字、數字等記錄。
information	是圖書館收集、整理和提供的主要標的。其用處是協助讀者做出決策。
knowledge	有組織結構地傳遞某一主題的資訊。
wisdom	能夠用於創造新知識。`,
    'image': `Main Heading	https://blogger.googleusercontent.com/img/a/AVvXsEjqi8CJpmD2co9PEYYE98w0u2WnmzrzcAiZPBETsbcDK0Oi5MKuxPpZL0zGumu9O2Ifw7_hWYtT48ihsGJyraHNw0rf-qhR4TflZTcM2UkGmMGbH1gMSOMxxWKt5nsA3dDfgtAbY7IKzkYBpj698kycb58h7PpmavePprEeUbALntSi3FMt3_cjwA Bibliographic databases			
Main Heading	https://blogger.googleusercontent.com/img/a/AVvXsEjqi8CJpmD2co9PEYYE98w0u2WnmzrzcAiZPBETsbcDK0Oi5MKuxPpZL0zGumu9O2Ifw7_hWYtT48ihsGJyraHNw0rf-qhR4TflZTcM2UkGmMGbH1gMSOMxxWKt5nsA3dDfgtAbY7IKzkYBpj698kycb58h7PpmavePprEeUbALntSi3FMt3_cjwA Bibliographic Retrieval Services (BRS)
Abbreviation	https://i.ibb.co/fNFH3fz/2023-10-03-14-17.png BRS			
Subheadings 	https://i.ibb.co/fNFH3fz/2023-10-03-14-17.png principles of			
Locators	https://i.ibb.co/fNFH3fz/2023-10-03-14-17.png 38-39			
Cross-Reference	https://i.ibb.co/fNFH3fz/2023-10-03-14-17.png See also Bibliographic control			
Related Heading	https://i.ibb.co/fNFH3fz/2023-10-03-14-17.png Bibliographic control			
        
13	Which is the page(s) of "Indexing and Bibiographic control"?	68-70	13	 87-88, 115	202`
  }
}

// ----------------------------------------------------------------

let configEnv = {
  appName,
  appNameID: appName,
  debug: {
    ErrorHandler: {
      verbose: true
    },
    enableRestore: true,
  },
  
  inited: false,
  urlGithub: `https://github.com/pulipulichen/${appName}/`,
  urlIssue: `https://github.com/pulipulichen/${appName}/issues/new`,
  
}

for (let name in configEnv) {
  config[name] = configEnv[name]
}

import styleConfig from './styles/style.config.js'
config.styleConfig = styleConfig

//import readingConfig from './../config/reading.js'
//config.readingConfig = readingConfig

import productionConfig from './config.production.js'
if (process.env.NODE_ENV === 'production') {
  for (let name in productionConfig) {
    config[name] = productionConfig[name]
  }
}

export default config