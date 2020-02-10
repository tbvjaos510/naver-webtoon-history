export type WebtoonService<A = {}, R = {}> = (
  argument: A
) => Promise<Readonly<R>>;
