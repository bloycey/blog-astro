declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]] & Render;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"blog": {
"blog-comments-using-astro-and-supabase.mdx": {
  id: "blog-comments-using-astro-and-supabase.mdx",
  slug: "blog-comments-using-astro-and-supabase",
  body: string,
  collection: "blog",
  data: any
},
"dad-blog-1.mdx": {
  id: "dad-blog-1.mdx",
  slug: "dad-blog-1",
  body: string,
  collection: "blog",
  data: any
},
"how-I-built-my-blog-part-3.mdx": {
  id: "how-I-built-my-blog-part-3.mdx",
  slug: "how-i-built-my-blog-part-3",
  body: string,
  collection: "blog",
  data: any
},
"learning-ux-from-the-air-conditioner-remote.mdx": {
  id: "learning-ux-from-the-air-conditioner-remote.mdx",
  slug: "learning-ux-from-the-air-conditioner-remote",
  body: string,
  collection: "blog",
  data: any
},
"two-minute-method-for-getting-newborn-to-sleep.mdx": {
  id: "two-minute-method-for-getting-newborn-to-sleep.mdx",
  slug: "two-minute-method-for-getting-newborn-to-sleep",
  body: string,
  collection: "blog",
  data: any
},
"using-supabase-to-store-a-subscriber-list.mdx": {
  id: "using-supabase-to-store-a-subscriber-list.mdx",
  slug: "using-supabase-to-store-a-subscriber-list",
  body: string,
  collection: "blog",
  data: any
},
"whiskey-advent-calendar-2022.mdx": {
  id: "whiskey-advent-calendar-2022.mdx",
  slug: "whiskey-advent-calendar-2022",
  body: string,
  collection: "blog",
  data: any
},
"who-is-bloycey.mdx": {
  id: "who-is-bloycey.mdx",
  slug: "who-is-bloycey",
  body: string,
  collection: "blog",
  data: any
},
"why-i-used-astro-to-build-my-blog.mdx": {
  id: "why-i-used-astro-to-build-my-blog.mdx",
  slug: "why-i-used-astro-to-build-my-blog",
  body: string,
  collection: "blog",
  data: any
},
},

	};

	type ContentConfig = never;
}
