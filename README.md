This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
Using Wordpress [gosarpinos.flywheelsites.com](https://gosarpinos.flywheelsites.com) as a database

## Getting Started

Install node packages:
`npm install`

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Auto-Deployment

Auto-deployments are set in Vercel for the `main` branch, however the repo must be set to public in order for it to work.


## Adding Redirects

Take this link as an example:

`https://www.gosarpinos.com/pizza-delivery/sarpino-s-pizzeria-in-harwood-heights-chicago-o-hare#!/Info`

You have to remove the origin, and the fragments at the end, so that becomes

`/pizza-delivery/sarpino-s-pizzeria-in-harwood-heights-chicago-o-hare`

Then you just figure out where they redirect to, in this case, it should go to

`'/pizza-delivery/sarpinos-harwood-heights'`

Then just create a set command in Redis.

`SET '/pizza-delivery/sarpino-s-pizzeria-in-harwood-heights-chicago-o-hare' '/pizza-delivery/sarpinos-harwood-heights'`

I usually test to make sure they don't exist before i create them, for that you just run

`GET '/pizza-delivery/harwood-heights-chicago-o-hare-sarpinos'`

If that returns a value that is wrong, you can remove it with

`DEL '/pizza-delivery/harwood-heights-chicago-o-hare-sarpinos'`

Then run your set command

`SET '/pizza-delivery/sarpino-s-pizzeria-in-harwood-heights-chicago-o-hare' '/pizza-delivery/sarpinos-harwood-heights'`

You can run those commands in the vercel dashboard

**Project -> Storage -> select the "sarpinos-next-app-redirects” db and it should pop up the CLI**

[Sarpinos Vercel Dashboard](https://vercel.com/sarpino-s-usa-inc/sarpinos-next-app/stores/kv/store_GvRdjfKE6Xy5k0TN/cli)


Just note that both the source and destination need to start with the / and neither should have any of the #! fragment stuff, and the source shoud be free of the ?foo=bar query stuff. 