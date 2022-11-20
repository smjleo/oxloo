<h1 align="center">oxloo</h3>
<h4 align="center">Democratising Oxford's toilets using Web3.</h3>

Built for [Oxford Hack 2022](https://oxfordhack22.co.uk/) (NEAR Challenge winner).
[Devpost Link](https://devpost.com/software/oxloo)

- [Inspiration](https://github.com/smjleo/oxloo#inspiration)
- [What it does](https://github.com/smjleo/oxloo#what-it-does)
- [Getting Started](https://github.com/smjleo/oxloo#getting-started)

## Inspiration

At Oxford, we are incredibly privileged to be surrounded by a wide variety of buildings, from historical to modern. Unfortunately, this means that some facilities are better than others, and toilets are no exception. As frequent toilet users™️, we didn't want to waste any more of our short term times by having to use subpar toilet facilities; however, we often can't predict the quality of unfamiliar toilets before it's too late. 

Traditional review platforms can have multiple disadvantages. They are often controlled by a single authority, potentially allowing them to hide information or ban participation from certain users. The anonymity of the platform means that users can post false or misleading details. Finally, as we've seen from the recent case of Z-Library, it is possible for authorities to shut the platform down - and there's certainly a possibility that the University would not want the sad state of some of its toilets to harm its reputation.

So we've built oxloo, a decentralised toilet review platform for Oxford. We use the NEAR Protocol: a Web3 technology that allows us - the students - to own our toilet reviews. The decentralised nature means that no one authority can control the data or shut it down; instead, it is stored on the blockchain, allowing us to maintain ownership of our data and create an inclusive platform. Through the voting system, the student body can democratically flag false or misleading reviews, discouraging bad actors. The simple 5-star rating system allows students to avoid certain bathrooms with ease.

## What it does

Users can search for toilets using the building name, address or postal code. They can browse the reviews submitted for a particular toilet, or add their own. If they have been misled by a review, they can cast a vote to hide it. 

## How we built it

Behind the scenes, oxloo uses the NEAR smart contracts to accept, validate and perform transactions. We used Typescript to write the smart contract, and React for the frontend. The authentication system is also handled by NEAR.

## Challenges we ran into

For about three hours, we encountered a strange bug that we couldn't fix. We even tried copy and pasting the demo contract and using it - it still wouldn't work! After a (bad) night's sleep, we just tried deleting the `build` folder to build everything from scratch when deploying, and it started to work. I need more coffee.

## Accomplishments that we're proud of

The silliness of the concept aside, we were quite proud of managing to learn a technology that was completely new to us and apply it in a project, in under 24 hours. We were also quite proud of how much free food we managed to eat during the hackathon (thanks).

## What we learned

How Web3 technologies work (on the surface level, at least) and how to make projects with it using NEAR!

## Getting started

Clone the repository, and install all the dependencies (we <3 node_modules):
```bash
~ git clone https://github.com/smjleo/oxloo
~ cd oxloo
~ npm install
```

Deploy the smart contract:
```bash
~ npm run deploy
```

And start the frontend server!
```bash
~ npm start
```

