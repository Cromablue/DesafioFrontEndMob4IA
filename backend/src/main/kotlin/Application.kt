package com.example

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.*

fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {
    // Configura o CORS para permitir requisições do frontend (ex: localhost:3000)
    install(CORS) {
        allowHost("localhost:5173", schemes = listOf("http"))
        allowHost("localhost:3000", schemes = listOf("http"))
        allowMethod(HttpMethod.Get)
        allowMethod(HttpMethod.Post)
        allowMethod(HttpMethod.Put)
        allowMethod(HttpMethod.Delete)
        allowHeader(HttpHeaders.ContentType)
        allowHeader(HttpHeaders.Authorization)
        allowHeader(HttpHeaders.AccessControlAllowOrigin)
        allowCredentials = true
        allowSameOrigin
    }

    install(ContentNegotiation) {
        json()
    }

    configureRouting()
}
