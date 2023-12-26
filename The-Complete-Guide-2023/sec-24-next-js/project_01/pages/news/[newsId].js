import { useRouter } from "next/router";

// domain.com/news/something-important

const DetailPage = () => {
  const router = useRouter();

  // access the path param
  const newsId = router.query.newsId;

  return <h1>{"Detail Page" + newsId}</h1>;
};

export default DetailPage;
