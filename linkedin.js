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
    // .then(function(){
    //     console.log("click on Network Button");
    //     function getConnectLinks(){
    //         let linksArr=[];
    //         let links=document.querySelectorAll('a[class="app-aware-link  discover-entity-type-card__link"]',{delay:50});
    //         for(let i=0;i<links.length;i++){
    //             linksArr.push(links[i].getAttribute('href'));
    //         }
            
    //         return linksArr;
    //     }

    //     let linksArrPromise=cTab.evaluate(getConnectLinks);
    //     return linksArrPromise;
    // })
    // .then(function(linksArr){
    //     console.log(linksArr);

    // })

    .then(function(){
        console.log("Wait for 5sec done");
        function getIds(){
            let idsArr=[];
            let allIds=document.querySelectorAll('button[class="msg-overlay-bubble-header__control msg-overlay-bubble-header__control--new-convo-btn artdeco-button artdeco-button--circle artdeco-button--muted artdeco-button--1 artdeco-button--tertiary ember-view"]',{delay:100});
            for(let i=0;i<allIds.length;i++){
                idsArr.push(allIds[i].getAttribute('id'));
            }

            return idsArr;
        }

        idsArrPromise=cTab.evaluate(getIds);
        return idsArrPromise;
    })
    .then(function(idsArr){
        console.log(idsArr);
        let minimizePromise=WaitAndClick("#"+idsArr[1]);
        return minimizePromise;
    })
    // .then(function(){
    //     console.log("Minimized");
    //     let clickSeeAllPromise=WaitAndClick('button[class="artdeco-button artdeco-button--muted artdeco-button--2 artdeco-button--tertiary ember-view"]');
    //     return clickSeeAllPromise;
    // })
    .then(function(){
        let wait20SecPromise=cTab.waitForTimeout(1000);
        return wait20SecPromise;
    })
    .then(function(){
        console.log("See All clicked");
        function getIds(){
            let idsArr=[];
            let allIds=document.querySelectorAll('button[class="artdeco-button artdeco-button--2 artdeco-button--secondary ember-view full-width"]',{delay:100});
            for(let i=0;i<allIds.length;i++){
                idsArr.push(allIds[i].getAttribute('id'));
            }
    
            return idsArr;
        }

        idsArrPromise=cTab.evaluate(getIds);
        return idsArrPromise;
    })
    .then(function(idsArr){
        console.log(idsArr);
        let clickOnFollowPromise=WaitAndClick("#"+idsArr[0]);
        for(let i=1;i<idsArr.length;i++){
            clickOnFollowPromise=clickOnFollowPromise.then(function(){
                let selector="#"+idsArr[i];
                return WaitAndClick(selector);
            })
        }

        return clickOnFollowPromise;
    })
    .then(function(){
        console.log("Click done !");
    })

    // .then(function(){
    //     console.log("Wait for 5sec done");
    //     let clickFollow=WaitAndClick('button[class="artdeco-button artdeco-button--2 artdeco-button--full artdeco-button--secondary ember-view full-width"]');
    //     return clickFollow;
    // })
    // .then(function(){
    //     console.log("Follow button clicked");
    // })
    


    function WaitAndClick(selector){
        let myPromise=new Promise(function(resolve,reject){
            let waitForSelectorPromise=cTab.waitForSelector(selector);
            waitForSelectorPromise
                .then(function(){
                    let clickPromise=cTab.click(selector,{delay:2000});
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