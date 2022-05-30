import React, { useState, useEffect, useCallback } from 'react'
import { Flex, FormControl } from '@chakra-ui/react'
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from '@choc-ui/chakra-autocomplete'
import useStore from 'store/store'

const MovieSelector = React.forwardRef((_props, ref : any): JSX.Element => {
  const [uniqueId, setUniqueId] = useState(0)
  const [selectorValues, setSelectorValues] = useState([])
  const [messageNoResult, setMessageNotResult] = useState('No results')

  const triggerTime = useStore(state => state.triggerTime)
  const answer = useStore(state => state.answer)
  const setAnswer = useStore(state => state.setAnswer)
  const openPopup = () => useStore.setState({ answerPopupOpened: true })

  /*
  /* Debouncing Search results
  */
  let filterTimeout
  const getOptions = useCallback((inputValue: string | undefined): void => {
    if (!inputValue) {
      setSelectorValues([])
    }
    if (inputValue.length > 2) {
      setMessageNotResult('Loading...')
      clearTimeout(filterTimeout)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      filterTimeout = setTimeout(() => {
        fetch(`/api/searchMovies?query=${inputValue}`)
          .then(response => response.json())
          .then(data => {
            setSelectorValues(data.results)
            if (data.results.length === 0) {
              setMessageNotResult('No results')
            }
          })
          .catch(() => {
            setSelectorValues([])
          })
      }, 500)
    } else {
      setSelectorValues([])
      setMessageNotResult('3 chars minimum')
    }
  }, [])

  const handlerSubmit = (movieData) => {
    const movieId = movieData.item.value
    if (!ref.current.value || movieId === answer) {
      return
    }
    setAnswer(movieId)
    triggerTime()
    openPopup()
    setUniqueId(Date.now())
  }

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
    <Flex>
      <FormControl w='100%' borderRadius='22px' backgroundColor='#342E59'>
        <AutoComplete
          backgroundColor='#342E59'
          borderRadius="22px"
          key={uniqueId}
          restoreOnBlurIfEmpty={false}
          emptyState={messageNoResult}
          emphasize={true}
          onSelectOption={movieData => handlerSubmit(movieData)}
          value=''
          selectOnFocus={false}>
          <AutoCompleteInput
            isLoading
            variant='filled'
            px='30px'
            borderRadius='22px'
            focusBorderColor='#342E59'
            height='81'
            fontSize='20px'
            backgroundColor='#342E59'
            placeholder='Your answer...'
            _hover={{ backgroundColor: '#342E59' }}
            onChange={(e) => getOptions(e.target.value)} ref={ref} />
            <AutoCompleteList>
              {selectorValues.map((item, cid) => {
                // eslint-disable-next-line camelcase
                const { id, title, release_date } = item
                // eslint-disable-next-line camelcase
                const year = release_date && release_date.split('-')[0]
                const thisrender = `${title} - ${year}`
                return (
                  <AutoCompleteItem
                    key={`option-${cid}`}
                    value={id}
                    label={thisrender}
                    getValue={() => `${id}`}
                    fontSize='18px'
                    mx='-0.5rem'
                    borderRadius='18px'
                    _hover={{ backgroundColor: '#FFF', color: '#272042' }}
                    _focus={{ backgroundColor: '#FFF', color: '#272042' }}
                    _active={{ backgroundColor: '#FFF', color: '#272042' }}
                  >
                    {thisrender}
                  </AutoCompleteItem>
                )
              })}
            </AutoCompleteList>
        </AutoComplete>
      </FormControl>
    </Flex>
  )
})

MovieSelector.displayName = 'MovieSelector'
export default MovieSelector
