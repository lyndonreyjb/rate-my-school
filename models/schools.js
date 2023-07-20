const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const ImgSchema = new Schema({ url: String, filename: String });

ImgSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_800,h_800,c_fit");
});

const opts = { toJSON: { virtuals: true } };

const SchoolSchema = new Schema(
  {
    title: String,
    images: [ImgSchema],
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    price: Number,
    description: String,
    location: String,
    user: {
      type: Schema.Types.ObjectID,
      ref: "User",
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  opts
);

SchoolSchema.virtual("properties.popUp").get(function () {
  return `<a href="/schools/${this._id}" class="text-sm inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 ">
  ${this.title} 
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 501.333 501.333" xml:space="preserve" width="100px" height="100px" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="240" y="33.067" style="fill:#637888;" width="21.333" height="121.6"></rect> <polygon style="fill:#0a7c94;" points="379.733,185.6 250.667,124.8 121.6,185.6 141.867,185.6 359.467,185.6 "></polygon> <polygon style="fill:#0891b2;" points="359.467,185.6 141.867,185.6 141.867,282.667 0,282.667 0,468.267 141.867,468.267 162.133,468.267 339.2,468.267 359.467,468.267 501.333,468.267 501.333,282.667 359.467,282.667 "></polygon> <rect x="210.133" y="356.267" style="fill:#3A5569;" width="81.067" height="112"></rect> <g> <rect x="38.4" y="331.733" style="fill:#FFFFFF;" width="21.333" height="30.933"></rect> <rect x="85.333" y="331.733" style="fill:#FFFFFF;" width="21.333" height="30.933"></rect> <rect x="133.333" y="331.733" style="fill:#FFFFFF;" width="21.333" height="30.933"></rect> <rect x="38.4" y="405.333" style="fill:#FFFFFF;" width="21.333" height="30.933"></rect> <rect x="85.333" y="405.333" style="fill:#FFFFFF;" width="21.333" height="30.933"></rect> <rect x="133.333" y="405.333" style="fill:#FFFFFF;" width="21.333" height="30.933"></rect> <rect x="193.067" y="197.333" style="fill:#FFFFFF;" width="21.333" height="32"></rect> <rect x="240" y="197.333" style="fill:#FFFFFF;" width="21.333" height="32"></rect> <rect x="286.933" y="197.333" style="fill:#FFFFFF;" width="21.333" height="32"></rect> <rect x="193.067" y="270.933" style="fill:#FFFFFF;" width="21.333" height="30.933"></rect> <rect x="240" y="270.933" style="fill:#FFFFFF;" width="21.333" height="30.933"></rect> <rect x="286.933" y="270.933" style="fill:#FFFFFF;" width="21.333" height="30.933"></rect> <rect x="346.667" y="331.733" style="fill:#FFFFFF;" width="21.333" height="30.933"></rect> <rect x="393.6" y="331.733" style="fill:#FFFFFF;" width="21.333" height="30.933"></rect> <rect x="441.6" y="331.733" style="fill:#FFFFFF;" width="21.333" height="30.933"></rect> <rect x="346.667" y="405.333" style="fill:#FFFFFF;" width="21.333" height="30.933"></rect> <rect x="393.6" y="405.333" style="fill:#FFFFFF;" width="21.333" height="30.933"></rect> <rect x="441.6" y="405.333" style="fill:#FFFFFF;" width="21.333" height="30.933"></rect> </g> <polyline style="fill:#f9c235;" points="240,33.067 180.267,33.067 180.267,75.733 240,75.733 "></polyline> </g></svg>
  </a> `;
});

SchoolSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("School", SchoolSchema);
