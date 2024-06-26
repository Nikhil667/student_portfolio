import React from "react";

import SummaryHeader from "./SummaryHeader";
import SummaryContent from "./SummaryContent";
import SummaryFooter from "./SummaryFooter";

export default function Summary({ id, title, content, user_name, generated_image, likes, time }) {

  return (
    <div className="wrapper summary py-2">

      <SummaryHeader key={`z_${id}`} summaryId={id} summaryTitle={title} contact_name={user_name} generated_image={generated_image} />

      <SummaryContent key={`y_${id}`} summaryShortContent={content} />

      <SummaryFooter key={`x_${id}`} summaryId={id} summaryLikes={likes} summaryUploadedOn={time} />
      
    </div>
  );
}
0