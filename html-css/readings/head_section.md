## HTML Head Section

The <head></head> section of an HTML document contains important information about the page such as title, description, external style sheets, scripts and more.

This information does not render as content and therefore does not belong in the `<body></body>`.

### Title

The <title></title> element displays a title for the webpage:

![Head Section Example](../assets/head-section-app-academy.jpg)

### MetaData

The meta tag is extremely important for all modern web pages because it is used to describe our websites to search engines.

This topic of optimizing web pages for the best search results makes up an entire field of study called Search Engine Optimization (SEO).

Because Google represents the #1 source for information, it is no wonder that having a Search Engine Optimized site is one of the best ways to gain traffic.

The first two steps are to optimize your page titles and descriptions. Example:

    <head>
        <title>Shakshuka Recipe</title>
        <meta name="description" content="The best, simple recipe for delicious Middle Eastern Shakshuka, a cumin spiced tomato sauce with sautéd onions and chili peppers topped with poached eggs. ">
    </head>

When writing our title tags and meta descriptions it is important to think as if we were a user typing into the Google search field.

Keywords that the user types in will be bolded within our description and the more closely our title/description matches the searched keywords, the better our page will rank on Google.

Here are a couple articles regarding titles and descriptions from the SEO industry experts MOZ: [SEO Title Tags](https://moz.com/learn/seo/title-tag), [Meta Description](https://moz.com/learn/seo/meta-description)

Another metatag is the characterset information mentioned in the beginning of the HTML curriculum. Example:

    <meta charset="utf-8">

[W3schools](http://www.w3schools.com/tags/ref_charactersets.asp) has a decent history lesson ending in the modern HTML default: Unicode UTF-8.

Additional Metatags include page authorship, content-language, social media specific descriptions, and information for the browser about how the page should be served.

Additional Resources: [MDN Meta Tag Documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta)

### Scripts

Another popular element found in the head section is a script tag. The language for these scripts defaults to Javascript but may also be specified with a type attribute.

We may either write javascript within the script element or provide a src attribute that refers to an external javascript file.

Here is an example of a script we should all have on our websites which loads Google's popular free analytics platform: Google Analytics.

    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-12345678-9', 'auto');
      ga('send', 'pageview');

    </script>

Don't worry about reading this script and trying to understand what it does. This script is provided by Google when creating a Google Analytics account and we are instructed to palce it at the bottom of our head section.

Here is an example using an external javascript file with a declared type attribute:

    <script type="text/javascript" src="review-submit-example.js"/>

### Link Tag

The final piece we will cover with regards to the head section is the link element. This is most commonly used to load an external style sheet covered in the next part of this curriculum: CSS.

Example:

    <link rel="stylesheet" href="style.css" type="text/css">

The rel attribute defines the relationship and must refer to stylesheet when loading an external style sheet file.

The href attribute specifies the URL of the defined resource, in this case the path to the css file being requested.

Similar to the script tag, type declares the content-language for the file being loaded.

Additional Documentation: [MDN Link Tag Documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link)
