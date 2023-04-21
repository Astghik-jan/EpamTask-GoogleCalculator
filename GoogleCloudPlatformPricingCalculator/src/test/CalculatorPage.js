const { Builder, By, Key, until } = require('selenium-webdriver');

        const assert = require('assert');

        (async function example() {
        let driver = await new Builder().forBrowser('chrome').build();
        try {
        // Step 1 Open https://cloud.google.com/
        await driver.get('https://cloud.google.com/');

        // Step 2-3 By clicking the search button on the portal at the top of the page, enter in the search field "Google Cloud Platform Pricing Calculator".
        //Start the search by clicking the search button.
        await driver.findElement(By.xpath("//input[@title='Search']")).sendKeys("Google Cloud Platform Pricing Calculator", Key.RETURN);

        // Step 4 In the search results, click "Google Cloud Platform Pricing Calculator" and go to the calculator page.
        await driver.wait(until.elementLocated(By.partialLinkText('Google Cloud Platform Pricing Calculator'))).click();

        // Step 5 Activate the COMPUTE ENGINE section at the top of the page
        await driver.wait(until.elementLocated(By.xpath("//md-tab-item[contains(.,'Compute Engine')]"))).click();

        // Step 6 Fill in the form with the following data:
         /*       Number of instances: 4
                  What are these instances for ?: leave blank
                  Operating System / Software: Free: Debian, CentOS, CoreOS, Ubuntu, or other User Provided OS
                  VM Class: Regular
                  Instance type: n1-standard-8 (vCPUs: 8, RAM: 30 GB)
                  Select Add GPUs
                  Number of GPUs: 1
                  GPU type: NVIDIA Tesla V100
                  Local SSD: 2x375 Gb
                  Datacenter location: Frankfurt (europe-west3)
                  Commited usage: 1 Year */
        await driver.wait(until.elementLocated(By.name('quantity'))).sendKeys('4');
        await driver.wait(until.elementLocated(By.xpath("//md-select[@placeholder='Operating System / Software']"))).click();
        await driver.wait(until.elementLocated(By.xpath("//md-option[contains(.,'Free: Debian, CentOS, CoreOS, Ubuntu, or other User Provided OS')]"))).click();
        await driver.wait(until.elementLocated(By.xpath("//md-select[@placeholder='VM Class']"))).click();
        await driver.wait(until.elementLocated(By.xpath("//md-option[contains(.,'Regular')]"))).click();
        await driver.wait(until.elementLocated(By.xpath("//md-select[@placeholder='Instance type']"))).click();
        await driver.wait(until.elementLocated(By.xpath("//md-option[contains(.,'n1-standard-8')]"))).click();
        await driver.wait(until.elementLocated(By.xpath("//md-checkbox[@ng-model='listingCtrl.computeServer.addGPUs']/div"))).click();
        await driver.wait(until.elementLocated(By.xpath("//input[@ng-model='listingCtrl.computeServer.GPUs']"))).sendKeys('1');
        await driver.wait(until.elementLocated(By.xpath("//md-select[@ng-model='listingCtrl.computeServer.GPUtype']"))).click();
        await driver.wait(until.elementLocated(By.xpath("//md-option[contains(.,'NVIDIA Tesla V100')]"))).click();
        await driver.wait(until.elementLocated(By.xpath("//md-select[@ng-model='listingCtrl.computeServer.localSSD']"))).click();
        await driver.wait(until.elementLocated(By.xpath("//md-option[contains(.,'2x375 GB')]"))).click();
        await driver.wait(until.elementLocated(By.xpath("//md-select[@ng-model='listingCtrl.computeServer.datacenterLocation']"))).click
        await driver.wait(until.elementLocated(By.xpath("//md-select[@ng-model='listingCtrl.computeServer.commitment']"))).click();
        await driver.wait(until.elementLocated(By.xpath("//md-option[@value='1YR']"))).click();

        // Step 7 Click Add to Estimate
        await driver.wait(until.elementLocated(By.xpath("//button[contains(.,'Add to Estimate')]"))).click();

        // Step 8 Select EMAIL ESTIMATE
        await driver.wait(until.elementLocated(By.xpath("//button[contains(.,'Email Estimate')]"))).click();

        // Step 9 In a new tab, open https://10minutemail.com or a similar service for generating temporary emails
        await driver.executeScript("window.open('https://10minutemail.com')");
        await driver.switchTo().window(driver.getAllWindowHandles()[1]);

        // Step 10 Copy the mailing address generated in 10minutemail
        let email = await driver.wait(until.elementLocated(By.id('email'))).getText();

        // Step 11 Return to the calculator, in the Email field enter the address from the previous paragraph
        await driver.switchTo().window(driver.getAllWindowHandles()[0]);
        await driver.wait(until.elementLocated(By.name('email'))).sendKeys(email);

        // Step 12 Press SEND EMAIL
        await driver.wait(until.elementLocated(By.xpath("//button[contains(.,'Send Email')]"))).click();

        // Step 13 Wait for the letter with the cost calculation and check that the Total Estimated Monthly Cost in the letter matches what is displayed in the calculator
        let totalCost = await driver.wait(until.elementLocated(By.xpath("//h2[contains(.,'Total Estimated Monthly Cost')]/following-sibling::div"))).getText();
        await driver.wait(until.elementLocated(By.xpath("//button[contains(.,'Go to pricing')]"))).click();
        let costInEmail = await driver.wait(until.elementLocated(By.xpath("//td[contains(.,'Total Estimated Monthly Cost')]/following-sibling::td"))).getText();
        assert.equal(totalCost, costInEmail);
        } finally {
        await driver.quit();
        }
        })();

