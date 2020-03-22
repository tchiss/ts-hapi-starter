/* istanbul ignore file */
import * as Hapi from '@hapi/hapi'
import * as DotEnv from 'dotenv'
import Logger from './common/Logger'

DotEnv.config({
  path: `${process.cwd()}/.env`
})

class Server {
  private static _server: Hapi.Server

  public static async start (): Promise<Hapi.Server> {
    try {
      Server._server = new Hapi.Server({
        port: process.env.APP_PORT,
        host: process.env.APP_HOST
      })

      Server._server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
          return 'Hello World!'
        }
      })
      await Server._server.start()
      Logger.info(`Server running on http://${process.env.APP_HOST}:${process.env.APP_PORT}`)
    } catch (e) {
      Logger.error('error while starting server', e)
      throw e
    }
    return Server._server
  }

  public static stop (): Promise<Error | void> {
    Logger.info(`Server - Stopping execution`)
    return Server._server.stop()
  }

  public static async recycle (): Promise<Hapi.Server> {
    Logger.info(`Server - Recycling instance`)

    await Server.stop()

    return Server.start()
  }

  public static instance (): Hapi.Server {
    return Server._server
  }

  public static async inject (options: string | Hapi.ServerInjectOptions): Promise<Hapi.ServerInjectResponse> {
    return Server._server.inject(options)
  }

}

Server.start().catch(e => {
  Logger.info(`Error while starting the app`)
  throw e
})

process.on('SIGINT', async () => {
  Logger.info('Stopping hapi server')

  try {
    await Server.stop()
  } catch (e) {
    Logger.info(`Server stopped`)
    process.exit(e ? 1 : 0)
  }
})
