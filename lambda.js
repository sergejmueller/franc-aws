const franc = require( 'franc-min' )
const qs = require( 'querystring' )


exports.handler = ( event, context ) => {

    if ( event.httpMethod !== 'POST' ) {
        return context.succeed( {
            statusCode: 405,
            headers: { 'Content-Type': 'text/html' },
            body: '<meta http-equiv=refresh content="0;url=https://github.com/sergejmueller/franc-aws">'
        } )
    }

    if ( ! event.body ) {
        return context.succeed( {
            statusCode: 400
        } )
    }

    const userAgent = event.headers['User-Agent']
    const parsedBody = qs.parse( event.body )

    if ( ! userAgent || ! userAgent.startsWith( 'WordPress' ) ) {
        return context.succeed( {
            statusCode: 412
        } )
    }

    if ( typeof( parsedBody.data ) === 'undefined' ) {
        return context.succeed( {
            statusCode: 409
        } )
    }

    const parsedData = parsedBody.data.trim()
    const parsedDataLength = parsedData.length

    if ( ! parsedDataLength ) {
        return context.succeed( {
            statusCode: 424
        } )
    }

    if ( parsedDataLength > 1024 ) {
        return context.succeed( {
            statusCode: 431
        } )
    }

    context.succeed( {
        statusCode: 200,
        headers: { 'Content-Type': 'text/plain' },
        body: franc( parsedData )
    } )

};
