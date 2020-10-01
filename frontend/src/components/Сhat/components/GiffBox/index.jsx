import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { SendMessageIcon, SendGificon } from "icons";
import { StyledButton, StyledTextField, Loader } from 'components/common'
import { debounce } from "utils";

import {
  Container,
  InputGroup,
  GifsContainer,
  Gif,
  StyledImg,
  SendGifIconWrapper,
  PlaceholderContainer,
  Placeholder
} from "./styled";


const GifBox = ({ toggleGif, sendMessage }) => {
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [GIFs, setGIFs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Введите запрос");
  console.log("GifBox");

  useEffect(() => {
    if (offset) {
      getGIFs();
    }
  }, [offset]);

  useEffect(() => {
    if (!GIFs.length && !placeholder) {
      setPlaceholder("Введите запрос");
    }
  }, [GIFs]);

  const handleScroll = e => {
    if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
      setOffset(offset + 10);
    }
  };

  const handleChangeHelper = useCallback(debounce(search => {
    setOffset(0);
    setGIFs([]);

    if (!search) return;
    
    setLoading(true);
    getGIFs(search);
  }, 800),
    []);

  const handleChange = e => {
    const value = e.target.value;
    setSearch(value);
    handleChangeHelper(value);
  };

  const sendGIF = gif => () => {
    sendMessage({
      type: "gif",
      url: gif.original
    });
  };

  function getGIFs(value) {
    setPlaceholder("");
    const q = value || search;
    // todo поискать подобные крутые темы (стикеры и т.п.)
    // todo url вынести, добавить source, useFetch, порефакторить каждый компонент
    axios.get('https://api.giphy.com/v1/gifs/search', {
      params: {
        api_key: 'ln9tgm0RCZiGOcD5D6Gm3Wr8JYXLq4Zh',
        q,
        limit: 16,
        offset: offset,
        // G : Содержание, которое подходит для всех возрастов и людей.
        // PG : Чуть развращеннее 
        // PG-13 : Жестче
        // Р : Хард
        rating: "PG-13",
        lang: "ru"
      }
    })
      .then(response => {
        const results = response.data.data || response.data;

        if (results.length) {
          const gifs = results.map(gif => ({
            original: gif.images.fixed_height.url,
            fixed: gif.images.fixed_height_small.url,
          }));

          setGIFs(GIFs.concat(gifs));
        } else if (value) {
          setPlaceholder("По запросу ничего не найдено");
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log("getGIFs", error);
      });
  }

  return (
    <Container>
      <InputGroup>
        <StyledButton
          onClick={toggleGif}
          startIcon={<SendMessageIcon width="12px" height="12px" />}
          borderRadius="4px 0 0 4px"
          secondary
        >
          Messages
        </StyledButton>
        <StyledTextField
          placeholder="Search Gif"
          value={search}
          onChange={handleChange}
          height="100%"
          underline
          fullWidth
        />
      </InputGroup>

      <GifsContainer
        onScroll={handleScroll}
      >
        {
          !loading
            ?
            <>
              {(GIFs.length)
                ?
                GIFs.map(gif => (
                  <Gif
                    key={gif.fixed}
                    onClick={sendGIF(gif)}
                  >
                    <StyledImg src={gif.fixed} alt="" />
                    <SendGifIconWrapper>
                      <SendGificon width="24px" height="24px" />
                    </SendGifIconWrapper>
                  </Gif>
                ))
                :
                <PlaceholderContainer>
                  <Placeholder>
                    {placeholder}
                  </Placeholder>
                </PlaceholderContainer>
              }
            </>
            :
            <>
              <Loader />
            </>
        }
      </GifsContainer>
    </Container>
  );
};

export default GifBox;
