const element = (
  <>
    <Food
      season={{
        sault: <p a={[{}]} />,
      }}
    />
    {/* jsx comment */}
    <h1 className="title" data-title="true">
      Read{' '}
      <Link href="/posts/first-post">
        <a>this page! - {Date.now()}</a>
      </Link>
    </h1>
  </>
)
