const puppeteer= require("puppeteer");

let email="india17032001@gmail.com";
let password="@17MARCH2001";
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
    // .then(function(){
    //     console.log("Linkdin is open");
    //     let LoginThroughGoogle=WaitAndClick('span[class="google-sign-in-cta__text"]');
    //     return LoginThroughGoogle;
    // })
    // .then(function(){
    //     console.log("Google Login");
    // })
    .then(function(){
        console.log("Linkdin is open");
        let emailWillBeTypedPromise=cTab.type('input[id="session_key"]',email);
        return emailWillBeTypedPromise;
    })
    .then(function(){
        console.log("Email is typed");
        let passwordWillBeTypedPromise=cTab.type('input[id="session_password"]',password);
        return passwordWillBeTypedPromise;
    })
    .then(function(){
        console.log("Password Typed");
        let signInButtonClick=WaitAndClick('button[class="sign-in-form__submit-button"]');
        return signInButtonClick;
    })
    .then(function(){
        console.log("Clicked on Sign In Buttton");
        let clickOnMyNetworkPromise=WaitAndClick('span[title="My Network"]');
        return clickOnMyNetworkPromise;
    })
    // .then(function(){
    //     console.log("click on Network Button");
    //     let clickFollowPromise=WaitAndClick('button[aria-label="Follow Love Babbar"]');
    //     return clickFollowPromise;
    // })
    .then(function(){
        console.log("click on Network Button");
    })


    function WaitAndClick(selector){
        let waitForSelectorPromise=cTab.waitForSelector(selector);
        waitForSelectorPromise
            .then(function(){
                let clickPromise=cTab.click(selector);
                return clickPromise;
            })
    }