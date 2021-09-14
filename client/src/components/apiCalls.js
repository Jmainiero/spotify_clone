const apiCalls = (accessToken) => {
  const fetchPlaylists = async () => {
    try {
      const r = await axios.post('http://localhost:8888/playlists', {
        access_token: accessToken,
      });
      setPlaylists(r.data.items);
    } catch (e) {
      throw e;
    }
  };

  const fetchRecommended = async () => {
    try {
      const r = await axios.post('http://localhost:8888/recommended', {
        access_token: accessToken,
      });
      setRecommended(r.data);
    } catch (e) {
      throw e;
    }
  };
  const fetchRecentlyPlayed = async () => {
    try {
      const r = await axios.post('http://localhost:8888/recentlyPlayed', {
        access_token: accessToken,
      });
      setRecentlyPlayed(r.data);
    } catch (e) {
      throw e;
    }
  };
  const fetchFeaturedPlaylists = async () => {
    try {
      const r = await axios.post('http://localhost:8888/getFeatured', {
        access_token: accessToken,
      });
      setFeaturedPlaylists(r.data.playlists.items);
    } catch (e) {
      throw e;
    }
  };

  const fetchDefaultPlaylists = async () => {
    try {
      const r = await axios.post('http://localhost:8888/defaultPlaylists', {
        access_token: accessToken,
      });
      setDefaultPlaylists(r.data);
    } catch (e) {
      throw e;
    }
  };
  const fetchNewReleases = async () => {
    try {
      const r = await axios.post('http://localhost:8888/getNewReleases', {
        access_token: accessToken,
      });
      setnewReleases(r.data);
    } catch (e) {
      throw e;
    }
  };
  const fetchTopCategories = async () => {
    try {
      const r = await axios.post('http://localhost:8888/getTopCategories', {
        access_token: accessToken,
      });
      setTopCategories(r.data);
    } catch (e) {
      throw e;
    }
  };
  fetchPlaylists();
  fetchRecommended();
  fetchRecentlyPlayed();
  fetchFeaturedPlaylists();
  fetchDefaultPlaylists();
  fetchNewReleases();
  fetchTopCategories();

};
