
import React from "react";
import Link from "next/link";
import BookCover from './BookCover'
import { cn } from '@/lib/utils'

const BookCard = ({
  id,
  title,
  genre,
  color,
  cover,
  inLoanedBook = false,
}: Book) => {
  <li className={cn(isLoanedBook && "xs:w-52 w-full" )}>
    <Link href={`/books/${id}`}>
      <BookCover coverColor={color} coverUrl={cover} variant="wide" />
    </Link>
  </li>
}

export default BookCard
