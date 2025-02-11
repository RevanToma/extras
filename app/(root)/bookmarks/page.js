import DisplayBookmakrs from './display-bookmarks';

export default function BookmarksPage() {
  return (
    <main className='p-6 max-w-5xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4'>Bookmarked Articles</h1>
      <DisplayBookmakrs />
    </main>
  );
}
