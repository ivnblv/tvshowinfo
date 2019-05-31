import { searchShows, searchNames } from "../routines";

const initialState = {
  shows: [],
  names: [],
  liveSearchShows: [
    {
      score: 15.695325,
      show: {
        id: 2,
        url: "http://www.tvmaze.com/shows/2/person-of-interest",
        name: "Person of Interestsfasfgasagwagawgawgwadawdawcwacwacwa",
        type: "Scripted",
        language: "English",
        genres: ["Action", "Crime", "Science-Fiction"],
        status: "Ended",
        runtime: 60,
        premiered: "2011-09-22",
        officialSite: "http://www.cbs.com/shows/person_of_interest/",
        schedule: { time: "22:00", days: ["Tuesday"] },
        rating: { average: 9.1 },
        weight: 93,
        network: {
          id: 2,
          name: "CBS",
          country: {
            name: "United States",
            code: "US",
            timezone: "America/New_York"
          }
        },
        webChannel: null,
        externals: { tvrage: 28376, thetvdb: 248742, imdb: "tt1839578" },
        image: {
          medium:
            "http://static.tvmaze.com/uploads/images/medium_portrait/163/407679.jpg",
          original:
            "http://static.tvmaze.com/uploads/images/original_untouched/163/407679.jpg"
        },
        summary:
          "<p>You are being watched. The government has a secret system, a machine that spies on you every hour of every day. I know because I built it. I designed the Machine to detect acts of terror but it sees everything. Violent crimes involving ordinary people. People like you. Crimes the government considered \"irrelevant\". They wouldn't act so I decided I would. But I needed a partner. Someone with the skills to intervene. Hunted by the authorities, we work in secret. You'll never find us. But victim or perpetrator, if your number is up, we'll find you.</p>",
        updated: 1551364282,
        _links: {
          self: { href: "http://api.tvmaze.com/shows/2" },
          previousepisode: { href: "http://api.tvmaze.com/episodes/659372" }
        }
      }
    },
    {
      score: 15.655527,
      show: {
        id: 39429,
        url: "http://www.tvmaze.com/shows/39429/first-person",
        name: "First Person",
        type: "Documentary",
        language: "English",
        genres: [],
        status: "Ended",
        runtime: 30,
        premiered: "2000-02-16",
        officialSite: null,
        schedule: { time: "", days: ["Tuesday"] },
        rating: { average: null },
        weight: 0,
        network: {
          id: 52,
          name: "Bravo",
          country: {
            name: "United States",
            code: "US",
            timezone: "America/New_York"
          }
        },
        webChannel: null,
        externals: { tvrage: null, thetvdb: 79844, imdb: null },
        image: {
          medium:
            "http://static.tvmaze.com/uploads/images/medium_portrait/173/433459.jpg",
          original:
            "http://static.tvmaze.com/uploads/images/original_untouched/173/433459.jpg"
        },
        summary:
          "<p>Errol Morris is an Oscar-winning film director. The creator of groundbreaking documentaries like <i>The Thin Blue Line</i> and <i>The Fog of War</i>, he's turned his patented \"Interrotron\" on many a subject, getting them to explain their life and their philosophy for the camera. Now, in <b>First Person</b>, he combines Megatron interviews and stock footage to create a 24-minute profile of characters both fascinating and bizarre. Objectivity has been thrown wholesale right out the window. You're out there alone, utterly alone. All we can do is urge you to watch and wish you good luck.</p>",
        updated: 1541024925,
        _links: {
          self: { href: "http://api.tvmaze.com/shows/39429" },
          previousepisode: { href: "http://api.tvmaze.com/episodes/1556295" }
        }
      }
    },
    {
      score: 13.227687,
      show: {
        id: 31482,
        url: "http://www.tvmaze.com/shows/31482/good-person",
        name: "Good Person",
        type: "Scripted",
        language: "Korean",
        genres: ["Drama", "Romance"],
        status: "Ended",
        runtime: 65,
        premiered: "2003-08-27",
        officialSite: "http://www.imbc.com/broad/tv/drama/goodman/",
        schedule: { time: "21:55", days: ["Wednesday", "Thursday"] },
        rating: { average: null },
        weight: 0,
        network: {
          id: 166,
          name: "MBC",
          country: {
            name: "Korea, Republic of",
            code: "KR",
            timezone: "Asia/Seoul"
          }
        },
        webChannel: null,
        externals: { tvrage: null, thetvdb: null, imdb: null },
        image: {
          medium:
            "http://static.tvmaze.com/uploads/images/medium_portrait/125/314425.jpg",
          original:
            "http://static.tvmaze.com/uploads/images/original_untouched/125/314425.jpg"
        },
        summary:
          "<p>20 years ago, Park Joon Pil is the son of a mafia boss and Kang Tae Pyung is the son of a police officer. At the department store, while Kang Tae Pyung's dad attempts to arrest Joon Pil's dad, both the small boys become orphans. A fellow police officer takes in Joon Pil as his own son, thinking that the little boy is Tae Pyung. Tae Pyung, however, is taken into an orphan home. Joon Pil knows he is a criminal's son. 20 years later, Joon Pil is an aspiring young police officer and Tae Pyung is a boxing bum. When Tae Pyung's best friend becomes unfairly murdered, he vows to become a police officer. Two years later, Joon Pil and Tae Pyung finally meet again. Rivals but friends at heart, these two guys learn to forgive the past and embrace the future.</p>",
        updated: 1503949270,
        _links: {
          self: { href: "http://api.tvmaze.com/shows/31482" },
          previousepisode: { href: "http://api.tvmaze.com/episodes/1284038" }
        }
      }
    }
  ],
  liveSearchNames: [
    {
      score: 34.635384,
      person: {
        id: 172658,
        url: "http://www.tvmaze.com/people/172658/lauren-bush-lauren",
        name: "Lauren Bush Lauren",
        country: {
          name: "United States",
          code: "US",
          timezone: "America/New_York"
        },
        birthday: "1984-06-25",
        deathday: null,
        gender: "Female",
        image: {
          medium:
            "http://static.tvmaze.com/uploads/images/medium_portrait/108/272410.jpg",
          original:
            "http://static.tvmaze.com/uploads/images/original_untouched/108/272410.jpg"
        },
        _links: { self: { href: "http://api.tvmaze.com/people/172658" } }
      }
    },
    {
      score: 29.011051,
      person: {
        id: 5028,
        url: "http://www.tvmaze.com/people/5028/lauren-german",
        name: "Lauren German",
        country: {
          name: "United States",
          code: "US",
          timezone: "America/New_York"
        },
        birthday: "1978-11-29",
        deathday: null,
        gender: "Female",
        image: {
          medium:
            "http://static.tvmaze.com/uploads/images/medium_portrait/42/106488.jpg",
          original:
            "http://static.tvmaze.com/uploads/images/original_untouched/42/106488.jpg"
        },
        _links: { self: { href: "http://api.tvmaze.com/people/5028" } }
      }
    },
    {
      score: 29.011051,
      person: {
        id: 8140,
        url: "http://www.tvmaze.com/people/8140/lauren-weedman",
        name: "Lauren Weedman",
        country: {
          name: "United States",
          code: "US",
          timezone: "America/New_York"
        },
        birthday: "1969-03-05",
        deathday: null,
        gender: "Female",
        image: {
          medium:
            "http://static.tvmaze.com/uploads/images/medium_portrait/84/211953.jpg",
          original:
            "http://static.tvmaze.com/uploads/images/original_untouched/84/211953.jpg"
        },
        _links: { self: { href: "http://api.tvmaze.com/people/8140" } }
      }
    },
    {
      score: 29.011051,
      person: {
        id: 12519,
        url: "http://www.tvmaze.com/people/12519/lauren-stamile",
        name: "Lauren Stamile",
        country: {
          name: "United States",
          code: "US",
          timezone: "America/New_York"
        },
        birthday: "1976-09-12",
        deathday: null,
        gender: "Female",
        image: {
          medium:
            "http://static.tvmaze.com/uploads/images/medium_portrait/1/3422.jpg",
          original:
            "http://static.tvmaze.com/uploads/images/original_untouched/1/3422.jpg"
        },
        _links: { self: { href: "http://api.tvmaze.com/people/12519" } }
      }
    },
    {
      score: 29.011051,
      person: {
        id: 13040,
        url: "http://www.tvmaze.com/people/13040/lauren-skirvin",
        name: "Lauren Skirvin",
        country: null,
        birthday: null,
        deathday: null,
        gender: null,
        image: null,
        _links: { self: { href: "http://api.tvmaze.com/people/13040" } }
      }
    },
    {
      score: 29.011051,
      person: {
        id: 13549,
        url: "http://www.tvmaze.com/people/13549/lauren-mcneely",
        name: "Lauren McNeely",
        country: null,
        birthday: null,
        deathday: null,
        gender: null,
        image: null,
        _links: { self: { href: "http://api.tvmaze.com/people/13549" } }
      }
    },
    {
      score: 29.011051,
      person: {
        id: 16155,
        url: "http://www.tvmaze.com/people/16155/lauren-liem",
        name: "Lauren Liem",
        country: null,
        birthday: null,
        deathday: null,
        gender: null,
        image: null,
        _links: { self: { href: "http://api.tvmaze.com/people/16155" } }
      }
    },
    {
      score: 29.011051,
      person: {
        id: 16360,
        url: "http://www.tvmaze.com/people/16360/lauren-melendez",
        name: "Lauren Melendez",
        country: {
          name: "United States",
          code: "US",
          timezone: "America/New_York"
        },
        birthday: "1982-03-15",
        deathday: null,
        gender: "Female",
        image: {
          medium:
            "http://static.tvmaze.com/uploads/images/medium_portrait/152/381182.jpg",
          original:
            "http://static.tvmaze.com/uploads/images/original_untouched/152/381182.jpg"
        },
        _links: { self: { href: "http://api.tvmaze.com/people/16360" } }
      }
    },
    {
      score: 29.011051,
      person: {
        id: 17659,
        url: "http://www.tvmaze.com/people/17659/lauren-kelly",
        name: "Lauren Kelly",
        country: null,
        birthday: null,
        deathday: null,
        gender: null,
        image: null,
        _links: { self: { href: "http://api.tvmaze.com/people/17659" } }
      }
    },
    {
      score: 29.011051,
      person: {
        id: 18832,
        url: "http://www.tvmaze.com/people/18832/lauren-sharpe",
        name: "Lauren Sharpe",
        country: null,
        birthday: null,
        deathday: null,
        gender: "Female",
        image: {
          medium:
            "http://static.tvmaze.com/uploads/images/medium_portrait/186/465056.jpg",
          original:
            "http://static.tvmaze.com/uploads/images/original_untouched/186/465056.jpg"
        },
        _links: { self: { href: "http://api.tvmaze.com/people/18832" } }
      }
    }
  ],
  fetchingShows: false,
  fetchingNames: false
  // fetchingShowsLive: false,
  // fetchingNamesLive: false
};

// export default function(state = initialState, action) {
//   switch (action.type) {
//     default:
//       return state;
//     case SEARCH_SHOWS_REQUEST:
//       return {
//         ...state,
//         fetching: true
//       };
//     case SEARCH_SHOWS_SUCCESS:
//       return {
//         ...state,
//         fetching: false
//       };
//   }
// }

export default function(state = initialState, action) {
  switch (action.type) {
    case searchShows.TRIGGER:
      return {
        ...state,
        fetchingShows: true
      };
    case searchShows.SUCCESS:
      return {
        ...state,
        shows: action.payload
      };
    case searchShows.FULFILL:
      return {
        ...state,
        fetchingShows: false
      };

    case searchNames.TRIGGER:
      return {
        ...state,
        fetchingNames: true
      };
    case searchNames.SUCCESS:
      return {
        ...state,
        names: action.payload
      };
    case searchNames.FULFILL:
      return {
        ...state,
        fetchingNames: false
      };

    default:
      return state;
  }
}
