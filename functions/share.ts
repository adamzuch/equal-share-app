interface Env {}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const contributions = await context.request.json()
  console.log(...(contributions as never[]))
  return new Response('share')
}
