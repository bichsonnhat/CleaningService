/**
 * @swagger
 * /api/hello:
 *   get:
 *     tags: 
 *      - Greetings
 *     summary: Returns the hello world
 *     description: Returns the hello world
 *     responses:
 *       200:
 *          description: Hello World!
 *          content:
 *             application/json:
 *                schema:
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 *       400:
 *        description: Bad Request
 */
export async function GET(_request: Request) {
    // Do whatever you want
    return new Response('Hello World!', {
      status: 200,
    });
}