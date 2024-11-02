# coderbyte-text-search-highlighting-challenge
# How to run
1. Open the index.html file in VS-Code.
2. Use the live server extention to check it via browser
3. This is simple client side web page no need to use node js just open it using any browser

# Technology Stack
1. Vue js
2. Bootstrap

# How does it work
1. the app is divided into two components the search bar and the article blocks
2. the articles are rendered using the reactivity of vue js, this means that in memory we have an array of articles, and when we say that this variable is reactive ( in Vue for ex ) this means that whenever the article var changed it will auto change in the DOM ( vue will handle this process )

3. so what we are doing is that the articles are filtered whenever the user type any key in the input box,
4. the highlighting was bit challenging because , but i figured it out by adding a unique ID for each instance of the article blocks
5. I matched the words and replaced it with span element of the initial content and the match class ( which gives yellow bg ).
