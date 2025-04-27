import AverageRating from "./_components/average-rating";
import Ratings from "./_components/ratings";
import RecentFeedback from "./_components/recent-feedback";

const DashboardPage = () => {
  return (
    <section>
      <div className="flex flex-col md:flex-row gap-4 mb-7">
        <Ratings />
        <AverageRating />
      </div>

      <RecentFeedback />
    </section>
  );
};

export default DashboardPage;
