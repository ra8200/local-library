
import React from "react";
import Link from "next/link";
import BookCover from "./BookCover"
import { cn } from "@/lib/utils"

const BookCard = ({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  isLoanedBook = false,
}: Book) => {
  return (
    <li className={cn(isLoanedBook && "xs:w-52 w-full" )}>
      <Link href={`/books/${id}`}>
        <BookCover coverColor={coverColor} coverUrl={coverUrl} variant="wide" />
      </Link>
    </li>
  );
}

export default BookCard
