# Sveriges Radio Player :radio:

Todays assignment is to use the Sveriges Radio API to fetch information about the radio channels and fetch playable audio stream urls to create a working radio player!

## How to complete this assignment

## Part 1

Before you go any further, take a moment to look at an example API response from Sveriges Radio. Here you can find a list of all 55 stations, and a url to each station's live stream: http://api.sr.se/api/v2/channels?format=json&size=100

Your task is to use `fetch()` to get this JSON from the Sveriges Radio API and render a list of channels with playable streams on your page. You should use at least the station name, image, and colour keys in the JSON to create a layout which looks something like this:

![Wireframe](https://github.com/davidshore/chas_radioplayer/blob/main/wireframe.png?raw=true)

#### API Key.

The Sveriges Radio API seems to work without any sort of authentication, so that's one less thing to worry about! :)

#### Audio

Check out the [documentation](https://www.w3schools.com/tags/tag_audio.asp) for the `<audio>` tag. The format for the stream is mp3, so you'll need to use a `<source>` with the "type" of "audio/mpeg".

---

## Part 2

#### For FWM - OWASP

[Read this article about OWASP](https://www.cloudflare.com/learning/security/threats/owasp-top-10/)

Give answers in swedish to the following questions in a text-file in your repo:

1. What is OWASP and what is its primary mission as described in the article?

1. Explain the concept of "Injection". Provide an example of how an injection attack could compromise a web application's security.

1. Explain two strategies to prevent Broken Authentication vulnerabilities.

1. Describe the potential consequences of Insecure Deserialization in web applications. How can developers protect against such attacks?

1. Briefly define Cross-Site Scripting (XSS) as outlined in the article and list two methods suggested in the article to prevent XSS attacks in web applications.

#### For UXF - WCAG

[Do this tutorial](https://www.w3schools.com/accessibility/)

Give answers in swedish to the following questions in a text-file in your repo:

1. Explain the importance of semantic elements in web development according to accessibility guidelines. Provide examples of at least two semantic HTML elements and clarify how they enhance accessibility for users with disabilities.

2. Describe the significance of color contrast in web design concerning accessibility. How does adhering to color contrast guidelines benefit users with visual impairments, and what are the recommended contrast ratios as per WCAG standards?

3. Discuss the role of alternative text (alt text) for images in accordance with accessibility guidelines. Why is it crucial to include descriptive alt text, and how does this contribute to making web content more accessible? Provide examples to illustrate your explanation.

4. Explain the purpose of landmarks in creating accessible web content. How do landmarks aid in navigation for users of assistive technologies, and can you provide examples of commonly used landmark elements in HTML?

5. Describe the significance of proper form labeling. Why is it important to label form elements, and what strategies can developers implement to ensure effective labeling for improved accessibility?

## GitHub

1. Create a Github repo.
2. Upload your files to Github:

```
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin <Address to your repo>
git push -u origin main
```

### Hand in the assignment

Click the link in canvas and input the link to your repo repo.

### :books: Reading List

- [SR API Docs](http://sverigesradio.se/api/documentation/v2/index.html)
- [Audio HTML Tag](https://www.w3schools.com/tags/tag_audio.asp)
- [MDN Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [MDN Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

---

### :sos: How to get help

Learning how to think as a web developer is learning how to be an expert in problem solving. So whenever you get stuck start with step 1 and continue until problem solved.

1. Google! In English, type in the error message if there is one, search within the language you're using (ie CSS, JavaScript etc).
2. Ask your code buddies in your team.
3. Ask your fellow students in Slack.
4. Ask the teacher. Please note: we are part of a sharing community - share the answer with your fellows.

---

### :boom: Success!

After completing this assignment you should be more comfortable using APIs, and have a little more of an idea of what you'd use an API for. You should be comfortable using `fetch()` to get data from the API into your page.

---

### :runner: Stretch Goals

#### First stretch goal

Design for zero data. Make your page look nice while the station list is loading by creating a "skeleton loader", like we discussed during the lecture. Consider using the Chrome [network throttler](https://developers.google.com/web/tools/chrome-devtools/network-performance/network-conditions) to simulate a slow connection and make it easier to test your code.

#### Second stretch goal

This task has one more stretch goal, but it is a little tough, and you'll need to do some research to complete it.

The task is to implement a search function which calls `.filter()` on the station list to decide which channels to render. This stretch goal requires you to research how to control form inputs.

You will need use the `onChange` attribute on an input to invoke a function which will use the input's value in the `.filter()` call to filter the stations. If you want the search to be more flexible, look into using [regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match) from the input value!
