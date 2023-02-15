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
        let emailWillBeTypedPromise=cTab.type('input[id="session_key"]',email,{delay:100});
        return emailWillBeTypedPromise;
    })
    .then(function(){
        console.log("Email is typed");
        let passwordWillBeTypedPromise=cTab.type('input[id="session_password"]',password,{delay:100});
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
    .then(function(){
        console.log("click on Network Button");
        let waitFor5Sec=cTab.waitForTimeout(5000);
        return waitFor5Sec;
    })
    .then(function(){
        console.log("click on Network Button");
        function getConnectLinks(){
            let linksArr=[];
            let links=document.querySelectorAll('a[class="app-aware-link  discover-entity-type-card__link"]',{delay:50});
            for(let i=0;i<links.length;i++){
                linksArr.push(links[i].getAttribute('href'));
            }
            
            return linksArr;
        }

        let linksArrPromise=cTab.evaluate(getConnectLinks);
        return linksArrPromise;
    })
    .then(function(linksArr){
        console.log(linksArr);
    })

    // .then(function(){
    //     console.log("Wait for 5sec done");
    //     let allLinksPromise=cTab.$$('button[class="artdeco-button artdeco-button--2 artdeco-button--full artdeco-button--secondary ember-view full-width"]',{delay:50});
    //     return allLinksPromise;
    // })
    // .then(function(linksArr){
    //     console.log("length : ",linksArr.length);
    // })


    function WaitAndClick(selector){
        let myPromise=new Promise(function(resolve,reject){
            let waitForSelectorPromise=cTab.waitForSelector(selector);
            waitForSelectorPromise
                .then(function(){
                    let clickPromise=cTab.click(selector);
                    return clickPromise;
                })
                .then(function(){
                    resolve();
                })
                .catch(function(err){
                    reject(err);
                })
            })

            return myPromise;
        }