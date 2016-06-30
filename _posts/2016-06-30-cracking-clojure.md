---
author:     Niall Robinson
layout:     post
title:      "Cracking Clojure with Enigma"
date:       2016-06-02
summary:    "Through the looking glass into functional programming"
categories: ['learning']
project:    none
thumbnail: "https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2016-06-02-go-enigma/Enigma.jpg"
header: "https://s3-eu-west-1.amazonaws.com/informatics-webimages/articles/2016-06-02-go-enigma/Enigma.jpg"
---

## Introduction
A few weeks ago, fellow Lab Rat Jacob Tomlinson wrote a great post about [craking Engima with Go](http://www.informaticslab.co.uk/learning/2016/06/02/go-enigma.html). In short, he wrote an emulator of the [Enigma Machine](https://en.wikipedia.org/wiki/Enigma_machine) used to encode messages by the Nazis in WWII, and cracked the [Alan Turing](https://en.wikipedia.org/wiki/Alan_Turing) and co at Bletchly Park. This feat has gone done as a seminal moment in computing and one of the crucial reasons the Allies won the war.

While Jacob used this as hack to learn hot new language [Go](https://golang.org/), I've used it as an excuse to jump into [Clojure][clojure], and in general [functional programming][functional-programming].

## You've learned some language? Big deal.
*But wait, this is different.*

Functional programming is a style of coding which has turned a lot of what I thought I new about writing software and turned it on its head. I found lots of [misty eyed blog posts](http://clojure.org/about/rationale) on-line talking about how learning functional programming help you write expressive, efficient, parallelisable code. People also seem to have a semi-religious zeal for how it helps you "think about all coding differently", "attain software enlightenment", generally build character, solve world hunger etc.

To good to miss, right? So with this in mind, and red-eye flight back from the US, I cracked my knuckles and took the jump.

## Functional programming?...So what, I can already write functions.
I'm sure. My programming education has gone something like this:

1. DOS/BASH: "Oooh, I can type something and the computer does it"
2. Scripts: "Nice! I can just stick all those commands on after another in lists"
3. Procedural programming: "This script is too long. I need to chop it up in to functions"
4. Object oriented programming: "I can't brain this problem as procedures. But I can if I can make a thing that does stuff!"

Functional programming is different. What if I told you that you couldn't really have:

1. Variables
1. For loops
1. Lines of code that follow on from each other
1. Objects/classes

...mainstays of any "proper" language I've learned. And because of this it's...better? (DISCLAIMER: You *can* do some of the things on this list, but essentially the language doesn't really want you to.)

## 60 second intoduction to Clojure
Just to make this less abstract, let's compare Clojure code to my procedural/object-oriented language of choice, Python.

### Adding two numbers
**Python**

    >> 1 + 2
    3

**Clojure**

    >> (+ 1 2)
    3


wot?

That's right, in functional programming the function come first, metaphorically and literally. The general syntax for a function call is `(my_func arg1 arg2...argn)`. In this case, `+` is our function and `1` and `2` are our arguments.

### Mutability and multiple lines
**Python**

    >> a = 2 + 2
    >> a = a * 10
    >> a
    40

**Clojure**

    >> (* 10 (+ 2 2))
    40

In Python we make a variable called `a`, and over the course of a few lines, do stuff to it before looking at the value. In Clojure, you don't tend to have variables which you change - in fact any data objects in Clojure are immutable (their value can't be changed).

Instead, you create a new data object by doing something to the old one. I like to think of each function application as a lens. You look a the original data though all these lenses held one in front of another, to see it as something else.

In the Clojure example you can see that, instead of multiple lines, we've got multiple sets of brackets instead.

### Loops
Here's a simple function to sum all the numbers in a list.

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

Right - stay with me here. If you consider this for a bit, you can see that we achieve `for` loop functionality by recursively calling a function. This is known as *tail end recursion*. Each time the loop goes round, it recalls itself, passing the `rest` of the values, that is the bits you'll be looking at in future iterations, and the `first` of the rest, that is the value you want to inspect on this iteration. You do this until there are no `rest` values, which means you've finished looping.

Because data objects don't exist outside of each recursive function call, this can be more efficient than a traditional for loop. That is, there are no spare data objects floating around between function calls, so this loop can scale infinitely without danger of stack overflows etc.

### Mutable state + concurrency = non-determinism (i.e. pain)
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

**Clojure**

    (def aDog {:name Jeff :barking false :happy false})

    (defn happy [dog] (assoc dog :happy true))
    (defn bark [dog] (assoc (happy dog) :barking true)))

    (+ (map :happy (map bark dogs)))

In the Python code we've made some dogs. They're happy when they bark. We want to count the total amount of doggy joy in our `happyness_index` (just go with it, okay?). If we distribute this task across nodes to execute at the same time, then we need some way to make sure that `happyness_index` isn't changed by two dogs at once. This is knows as a *race condition* and it means pain: flags, locks and general housekeeping that has nothing to do with the actual problem we're trying to solve.

Have a look at the Clojure code. You can now see one of my white lies: we make a data object - Jeff the Dog. The methods of our class now become lambda functions which take dogs such as Jeff When He's Sad, and then return a different dog - Jeff When He's Happy. NB: This is not a different version of Jeff - IT'S A COMPLETELY NEW JEFF!

Also, the final line gets rid of our race condition to a mutable shared variable.

## What? Who's Jeff? What happened to Enigma?
Ah yes, Enigma. Consider this code.

**Python**

    all_enigma_setups = [<THIS IS A BUNCH OF DIFFERENT ENIGMA MACHINE SETUPS>]
    for enigma_setup in enigma_setups:
        if isSolution(enigma_setup):
            return enigma_setup

**Clojure**

    (first (filter solution? enigma_setups))

Clojure is extremely lazy, something I can identify with. (This means it only does things when it really has to). The above code filters out all the elements of `enigma_setups` which return true when `solution?` is applied to it, and then takes the first one. The crucial thing is that Clojure doesn't do this inside bracket and *then* the outside - its clever enough to evaluate until it finds one solution.

## What's the advantage
"It can be made to run faster than other code." [Moor's Law](https://en.wikipedia.org/wiki/Moore%27s_law) is broken, and data volumes are getting bigger. At the [Met Office](http://www.metoffice.gov.uk/) we generate hundreds of terabytes of data a day. You can run from parallelisation but not for much longer. Due to the immutability of data and the lack of rack conditions in functional programming, this approach to coding gives you a logical flow which can be readily parallelised.

"It's easier to write than other code." Mutable data objects in classes have been called the "new spaghetti code", there easy to screw up and hard to fix. Getting rid of mutability and, frankly, traditional variables, eradicates this risk - something which could be especially useful when working with lots of data.


## So is it any good then?
...honestly, I don't know yet. I found it hard but interesting to write. It's already changed the way I think about designing other code by adding new tools to my arsenal - for instance the use of lambda function "lenses" comes more readily.

[functional-programming](https://en.wikipedia.org/wiki/Functional_programming)
[LISP](https://en.wikipedia.org/wiki/Lisp_(programming_language))
[clojure](https://en.wikipedia.org/wiki/Clojure)