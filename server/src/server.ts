import express from 'express'
import cors from 'cors'

import { PrismaClient } from '@prisma/client'
import { converMinutesToHoursString, convertHourStringToMinutes } from './utils/times-utils'

const app = express()
app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({
    log: ['info', 'warn', 'error']
})

app.post('/games/:id/ads', async (request, response) => {
    const gameId: any = request.params.id
    const body: any = request.body
    console.log(body.yearPlaying)
    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearPlaying: body.yearPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel
        }
    })
    return response.status(201).json(ad)
})

app.get('/ads', async (request, response) => {
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearPlaying: true,
            hourStart: true,
            hourEnd: true
        },
        orderBy: {
            CreatedAt: 'desc'
        }
    })
    return response.status(200).json(ads.map(ad=>{
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: converMinutesToHoursString(ad.hourStart),
            hourEnd: converMinutesToHoursString(ad.hourEnd)
        }
    }))
})

app.get('/ads/:id/discord', async  (request, response) => {
    const adId = request.params.id
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId
        }
    })

    return response.status(200).json({
        discord: ad.discord
    })
})

app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    })
    return response.status(201).json(games)
})

app.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearPlaying: true,
            hourStart: true,
            hourEnd: true
        },
        where: {
            gameId
        },
        orderBy: {
            CreatedAt: 'desc'
        }
    })
    return response.status(200).json(ads.map(ad=>{
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: converMinutesToHoursString(ad.hourStart),
            hourEnd: converMinutesToHoursString(ad.hourEnd)

        }
    }))
})

app.listen(3333)