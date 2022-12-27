interface TheoryArticleProps {
  children: React.ReactNode
}

export const TheoryArticle = ({ children }: TheoryArticleProps) => {
  return (
    <article className='prose-sm text-justify prose-h2:font-semibold dark:prose-invert dark:prose-p:text-gray-300'>
      {children}
    </article>
  )
}
