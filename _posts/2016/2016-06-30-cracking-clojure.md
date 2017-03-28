---
title: Cracking Clojure with Enigma
date: 2016-06-30 00:00:00 Z
categories:
- learning
author: Niall Robinson
layout: post
summary: Through the looking glass into functional programming
project: none
thumbnail: https://s3-eu-west-1.amazonaws.com/informatics-webimages/clojure-logo10%5B1%5D.png
header: https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2016-06-02-go-enigma/Enigma.jpg
---

## Introduction
A few weeks ago, fellow Lab Rat Jacob Tomlinson wrote a great post about [craking Engima with Go](http://www.informaticslab.co.uk/learning/2016/06/02/go-enigma.html). In short, he wrote an emulator of the [Enigma Machine](https://en.wikipedia.org/wiki/Enigma_machine) used to encode messages by the Nazis in WWII. This machine was famously cracked by [Alan Turing](https://en.wikipedia.org/wiki/Alan_Turing) and co. at Bletchly Park in a feat that has gone done as a seminal moment in computing and one of the crucial reasons the Allies won the war.

![Enigma Machine](https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2016-06-02-go-enigma/Enigma_M3.jpg)

While Jacob used this as a hack to learn hot new language [Go](https://golang.org/), I've used it as an excuse to jump into [Clojure][clojure], and [functional programming][functional-programming] in general. You can see my [Clojure Engima Cracker on Github](https://github.com/niallrobinson/enigma-clojure).

Before we get started a quick disclaimer: that link represents all the Clojure I've written...ever. As such, I don't know what I'm talking about. Got it? Good. Now listen up.

## You've learned some new language? Big deal.
*But wait, this time it's different.*

Functional programming is a style of coding which has turned a lot of what I thought I new about writing software on its head. I found lots of [misty](http://www.itworld.com/article/2693998/big-data/clojure-developers-are-the-happiest-developers.html) [eyed](https://teamgaslight.com/blog/why-were-learning-clojure) [blog](http://www.gigamonkeys.com/book/introduction-why-lisp.html) [posts](http://clojure.org/about/rationale) about how learning functional languages like Clojure helps you write [expressive](https://www.infoq.com/news/2013/03/Language-Expressiveness), [highly parallelisable](https://speakerdeck.com/chris_betz/spark-way), [portable](http://clojure.org/about/jvm_hosted) code. People have a semi-religious zeal for how it helps you "[think about all coding differently](http://owenrh.me.uk/blog/2015/08/24/)", "[attain software enlightenment](http://occamsoftware.blogspot.co.uk/2007/04/anyone-who-knows-how-to-program-in-lisp.html)", and generally build character, solve world hunger etc.

Too good to miss, right? So with this in mind, and a red-eye flight back from the US to fill, I cracked my knuckles and took the jump.

## Functional programming?...So what, I can already write functions.
I know, let me explain. My programming education has gone something like this:

1. **DOS/BASH:** "Oooh, I can type something and the computer does it"
2. **Scripts:** "Nice! I can just stick all those commands one after another in lists"
3. **Procedural programming:** "This script is too long. I need to chop it up in to functions"
4. **Object oriented programming:** "I can't brain this problem as functions. But I can if I can make a thing that does stuff!"

Functional programming is different from all of these. What if I told you that you couldn't really use:

* Variables
* For loops
* Lines of code that follow on from each other
* Objects/classes

Mainstays of any "proper" language, I'm sure you'll agree...

And because you don't use these things it's...better?* 

\* DISCLAIMER: You *can* do some of the things on this list, but essentially the language doesn't really want you to.

## 60 second intoduction to Clojure
Just to make this less abstract, let's compare Clojure code to my procedural/object-oriented language of choice, Python.

### Adding two numbers
**Python**

    >> 1 + 2
    3

**Clojure**

    >> (+ 1 2)
    3


wat?

That's right, in functional programming the function come first, literally and metaphorically. The general syntax for a function call is `(my_func arg1 arg2...argn)`. In this case, `+` is our function and `1` and `2` are our arguments.

### Mutability and multiple lines
**Python**

    >> a = 2 + 2
    >> a = a * 10
    >> a
    40

**Clojure**

    >> (* 10 (+ 2 2))
    40

In Python we make a variable called `a`, and over the course of a few lines, do stuff to it before looking at the value. In Clojure, you don't tend to have variables which you change - in fact data objects in Clojure are immutable (their value can't be changed).

Instead, you create a new data object by doing something to the old one. I think of each function application as a lens: you look a the original data though all these lenses held one in front of another, to see it as something else.

In the Clojure example you can see that, instead of multiple lines, we've got multiple sets of brackets instead.

### Loops
Here's a simple function to sum all the numbers in a list. (Obviously there is are better ways to sum in both languages, but just look at the logic flow.)

**Python**

    def sum(xs):
        acc = 0
        for x in xs:
            acc += x
        return acc

**Clojure**

    (defn sum
        ([xs]                             ; fn for one arg
            (sum xs 0))                   ; recur
        ([xs acc]                         ; fn for two args
            (if (not-empty xs)  
                (sum
                    (rest xs)             ; pass all but first for next
                    (+ (first xs) acc))   ; pass accumulation
                acc)))                    ; or return

Right - stay with me here. If you consider this for a bit, you can see that we achieve `for` loop functionality by recursively calling a function. This is known as *tail end recursion*. Each time the loop goes round, it recalls itself, passing:

* the `rest` of the values, that is the bits you'll be looking at in future iterations
* the running total

You then pluck off the `first` of the rest, that is the value you want to inspect on this iteration. You do this until there are no `rest` values, which means you've finished looping.

Because data objects don't exist outside of each recursive function call, this can be more efficient than a traditional for loop. That is, there are no spare data objects floating around between function calls, so this loop can scale infinitely without danger of stack overflows etc.

### Mutable state + concurrency = non-determinism (i.e. pain)
In this example we're going to have a lot of objects which we get to do stuff in parallel by using a `pool` of processing nodes. We've made some dogs. They're happy when they bark. We want to count the total amount of doggy joy in our `happiness_index` (just go with it, okay?). (This is psudo-code - imagine we've instantiated a bunch of `Dog`s, and we have a `pool` of parallel workers).

**Python**

    happiness_index = 0

    class Dog (object):
        def __init__(self, name):
            self.name = name
            self.barking = False
            self.happy = False
       def bark(self):
            self.barking = True
            self.happy = True
            happiness_index += 1

    pool.apply([dog.bark() for dog in dogs])

In Python, if we distribute this task across nodes to execute at the same time, we need some way to make sure that `happiness_index` isn't changed by two dogs at once. This is knows as a *race condition* and it means pain: flags, locks and general housekeeping that has nothing to do with the actual problem we're trying to solve. Even thought we don't normally have to do this as a high level coder, it's being done somewhere, meaning inefficiency and potential for cock-ups.

**Clojure**

    (def aDog {:name Jeff :barking false :happy false})

    (defn happy [dog] (assoc dog :happy true))
    (defn bark [dog] (assoc (happy dog) :barking true)))

    (+ (map :happy (map bark dogs)))

You can now see one of my white lies: we *do* make a data object in this example - Jeff the Dog. The methods of our Python class now become lambda functions which take dogs such as Jeff When He's Sad, and then return a different dog - Jeff When He's Happy. The point is, this is not a different version of Jeff - IT'S A COMPLETELY NEW JEFF!

Also, the final line gets rid of our race condition to a mutable shared variable.

## What? Who's Jeff? What happened to Enigma?
Ah yes, Enigma. Consider this code where we are testing a bunch of different Enigma Machine set-ups to see which one successfully decodes the code.

**Python**

    for enigma_setup in enigma_setups:
        if isSolution(enigma_setup):
            return enigma_setup

**Clojure**

    (first (filter solution? enigma_setups))

Clojure is extremely lazy, something I can identify with. (This means it only does things when it really has to). The above code filters out all the elements of `enigma_setups` which return true when `solution?` is applied to it, and then takes the first one.

The crucial thing is that Clojure doesn't do this inside bracket and *then* the outside - it's clever enough to evaluate until it finds one solution.

## What's Clojure good at?

### It can be made to run faster than other code
[Moor's Law](https://en.wikipedia.org/wiki/Moore%27s_law) is broken, and data volumes are getting bigger. At the [Met Office](http://www.metoffice.gov.uk/) we generate hundreds of terabytes of data a day. You can run from parallelisation but not for much longer. Due to the immutability of data and the lack of race conditions in functional programming, this approach to coding gives you a logical flow which can be readily parallelised.

### It's harder to make mistakes than other code
Mutable data objects in classes have been called the "new spaghetti code": they're easy to screw up and hard to fix. Clojure aficionados say that getting rid of mutability and, frankly, traditional variables, eradicates this risk - something which could be especially useful when working with lots of data.

### Roll-your-own language
Clojure (and LISP languages in general) has the flexibility to let you create *Domain Specific Languages*, that is, a version of Clojure which is molded to your problem. This is due to the concept of "code as data" (more officially called [*homoiconicity*](https://en.wikipedia.org/wiki/Homoiconicity)), which took me a long time to understand.

The revelation for me was that "code as data" really means exactly what it says. When you write a line of Clojure, you literally represent it as a Clojure data object: a line of Clojure code like `(+ 1 2 3)` is just a Clojure sequence data object in the same way that `(1 2 3 4)` is. The Clojure compiler simply knows that if the first element of a sequence is a function, it gets applied to the rest of the elements.

This seemingly innocuous property gives you the power to take Clojure code (i.e. Clojure data objects) and manipulate the language to behave in any way you like. For more information, read about Clojure macros.

### It builds character
Apart from anything else it's really interesting to be made to think about coding differently for a while. Clojure's already changed the way I think about designing code in other languages: it's made me think purely in verbs when every other language I know makes you think in nouns.

## So is it any good then?
Honestly, I don't know yet. I found it hard but interesting to write. I haven't got to the expressive nature of Clojure, but I'm willing to believe I could.  Hopefully one day I'll see a golden lambda emerge from the sky before evaporating in a puff of enlightened Clojure inflected smoke.

<p style="text-align:center"><img src="https://s3-eu-west-1.amazonaws.com/informatics-webimages/clojure-logo10%5B1%5D.png" alt="Om Mane Padme Om" width="30%" height="30%"></p>

[functional-programming]: https://en.wikipedia.org/wiki/Functional_programming
[clojure]: https://en.wikipedia.org/wiki/Clojure
