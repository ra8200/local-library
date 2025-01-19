import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";

const Home = () => (
    <>
      <BookOverview 
        id={sampleBooks[0].id}
        title={sampleBooks[0].title}
        author={sampleBooks[0].author}
        genre={sampleBooks[0].genre}
        rating={sampleBooks[0].rating}
        total_copies={sampleBooks[0].totalCopies}
        available_copies={sampleBooks[0].availableCopies}
        description={sampleBooks[0].description}
        color={sampleBooks[0].coverColor}
        cover={sampleBooks[0].coverUrl}
        video={sampleBooks[0].videoUrl}
        summary={sampleBooks[0].summary}
      />

      <BookList 
        title="Latest Books"
        books={sampleBooks}
        containerClassName="mt-28"
      />
    </>
  );

export default Home;
