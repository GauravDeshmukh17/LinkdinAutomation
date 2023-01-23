const puppeteer= require("puppeteer");

let phone="9604692451";
let password;
let cTab;

let browserOpenPromise=puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args:["--start-maximized"]
});

browserOpenPromise
    .then(function(browser){
        let allTabspromise=browser.pages();
        // console.log(browser);
        return allTabspromise;
    })
    .then(function(allTabsArr){
        console.log("Browser is open");
        cTab=allTabsArr[0];
        let linkdinPageWillBeOpen=cTab.goto("https://www.linkedin.com/home");
        return linkdinPageWillBeOpen;
    })
    .then(function(){
        console.log("Linkdin is open");
        let LoginThroughGoogle=WaitAndClick('span[class="google-sign-in-cta__text"]');
        return LoginThroughGoogle;
    })
    .then(function(){
        console.log("Google Login");
    })
    // .then(function(){
    //     let emailWillBeTypedPromise=cTab.type('input[id="session_key"]',phone);
    //     return emailWillBeTypedPromise;
    // })


    function WaitAndClick(selector){
        let myPromise=new Promise(function(){
            let waitForSelectorPromise=cTab.waitForSelector(selector);
            waitForSelectorPromise
                .then(function(){
                    let clickPromise=cTab.click(selector);
                    return clickPromise;
                })
        })
    
    }