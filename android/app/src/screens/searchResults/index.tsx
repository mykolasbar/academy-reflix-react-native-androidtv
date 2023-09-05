import React, { useContext, useState, useEffect, useRef }  from 'react';
import { View, ScrollView, TextInput, Pressable, Text, Image } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import Styles from '../../assets/styles'
import TextColorSwitcher from '../../components/TextColorSwitcher';
import Menu from '../../components/Menu';
import { fetchListData } from '../../services/MongoDBFetch';
import filmInterface from '../../assets/filmInterface'
import { SelectList } from 'react-native-dropdown-select-list'
import { Dropdown } from 'react-native-element-dropdown';
import ShowMoreButton from '../../components/ShowMoreButton';
import BackButton from '../../components/BackButton';
import LoadingAnimation from '../../components/LoadingAnimation';

const Search = ({navigation}: any) => {
    let theme = useContext(ThemeContext)

    const [filmList, setFilmList] = useState<Array<filmInterface> | undefined | string >([])
    const [query, setQuery] = useState<String>()
    const [category, setCategory] = useState<String>('')
    const [searchActive, setSearchActive] = useState<Boolean>(false)
    const [totalPages, setTotalPages] = useState<number | undefined>()
    const [totalResults, setTotalResults] = useState<number | undefined>()
    const [error, setError] = useState<Boolean | String>(false)
    const [showNavigation, setShowNavigation] = useState<Boolean>(false)
    const [loading, setLoading] = useState<Boolean>(false)
    const [filmsPage, setFilmsPage] = useState<Array<filmInterface> | undefined>([])
    const [searchButtonInFocus, setSearchButtonInFocus] = useState<Boolean>(false)
    const [searchBoxInFocus, setSearchBoxInFocus] = useState<Boolean>(true)
    const [selectBoxInFocus, setSelectBoxInFocus] = useState<Boolean>(true)

    const [page, setPage] = useState<number>(1)
    const [recordsPerPage, setRecordsPerPage] = useState<number>(10)
    let indexOfLastPost = page * recordsPerPage
    let indexOfFirstPost = indexOfLastPost - recordsPerPage

    const searchInput = useRef<TextInput>(null);

    const data = [
        {key:'title', value:'title'},
        {key:'director', value:'director'},
    ]

    const handleSearch = (page: any) => {
        setSearchActive(true)
        if (query !== undefined && query !== '') {
            if (category !== '') {
                setError(false)
                setLoading(true)
                // setPage(1)
                fetchListData('http://10.0.2.2:3000/films.find?' + category + '=' + query)
                .then((response) => {console.log('Search results: ' + response); setFilmList(response); setTotalResults(response.length); setTotalPages(Math.ceil(response.length/recordsPerPage)); setLoading(false)})
                .catch((err) => {setError(err.message)})
            }
            else 
                setError('Please select search constraint')
            }
        else 
            setError('Please add search query')
        }
        
        useEffect(()=>{
            typeof filmList != 'string' && setFilmsPage(filmList?.slice(indexOfFirstPost, indexOfLastPost))
        }, [filmList, page])

        console.log('Total results ' + totalResults);

        let focusNext = () => {
            if (searchInput.current !== null) {
                searchInput.current.focus();
            }
        }

    return (
        <>
            <Menu navigation = {navigation}/>
            <View style={[Styles.container, {backgroundColor: theme?.getColorTheme() == 'dark' ? '#1c1d1f' : 'white'}]}>
            <BackButton />
            <ScrollView style = {[Styles.browseRows, {marginBottom:5}]} onMomentumScrollBegin = {()=>{setShowNavigation(true)}}>
            <TextColorSwitcher style = {Styles.browseScreenHeader}>Find films</TextColorSwitcher>
                <View>
                    <TextInput 
                        style={[Styles.searchField, {borderColor: searchBoxInFocus ? 'red' : 'black'}]}
                        placeholder="Search by title or part of title"
                        autoFocus = {searchBoxInFocus ? true : false}
                        onFocus = {()=>{setSearchBoxInFocus(true)}} 
                        onBlur = {()=>{setSearchBoxInFocus(false)}} 
                        onSubmitEditing = {()=>{setSearchBoxInFocus(false); focusNext()}} 
                        onChangeText={(text)=>{setQuery(text); console.log(query)}}
                        blurOnSubmit={true}
                        // onSubmitEditing={() => { focusNext }}
                        ref={searchInput}
                    ></TextInput>
                    <SelectList
                        setSelected={setCategory}
                        data={data}
                        search={false}
                        dropdownStyles={{zIndex:10, position:'relative', backgroundColor:'#111617'}}
                        dropdownTextStyles={{color:'white'}}
                        inputStyles={{color:'white'}}
                        boxStyles={{backgroundColor:'#111617', marginBottom:8, position:'relative'}}
                        // ref={selectInput}
                        // onFocus={()=>{}}
                    />
                    {/* <Dropdown
                        style={{zIndex:10, position:'relative', backgroundColor:'#111617', borderColor: selectBoxInFocus ? 'red' : 'black'}}
                        data={data}
                        search
                        maxHeight={300}
                        labelField="key"
                        valueField="value"
                        placeholder={!selectBoxInFocus ? 'Select catgory' : '...'}
                        searchPlaceholder="Search..."
                        // value={value}
                        onFocus={() => setSelectBoxInFocus(true)}
                        onBlur={() => setSelectBoxInFocus(false)}
                        onChange={item => {
                            setCategory(item.value);
                            // setSelectBoxInFocus(false);
                        }}
                    /> */}
                    <Pressable
                        style = {[Styles.searchButton, {borderWidth: searchButtonInFocus ? 1 : 0, borderColor: searchButtonInFocus && 'red'}]}
                        onPress={() => {handleSearch(1)}}
                        onFocus={()=>{setSearchButtonInFocus(true)}}
                        onBlur={()=>{setSearchButtonInFocus(false)}}
                    >
                        <Text style = {{color:'white'}}>SEARCH</Text>
                    </Pressable>
                </View>
                {error ? <TextColorSwitcher style = {Styles.browseHeading}>Error: {error}</TextColorSwitcher> :
                    loading ? <LoadingAnimation message = 'Searching...'/> :
                        searchActive &&
                        typeof filmList != 'string' ?
                            (totalResults === 0 ? 
                                <TextColorSwitcher style = {Styles.browseScreenHeader}>No results</TextColorSwitcher> :
                                <View style = {{flexDirection:'column'}}>
                                    <View style = {Styles.searchResultsTop}>
                                        <TextColorSwitcher style = {Styles.browseScreenHeader}>Results</TextColorSwitcher>
                                        <TextColorSwitcher>Page: {page}</TextColorSwitcher>
                                    </View>
                                    <TextColorSwitcher>Total pages: {filmList?.length && Math.ceil(filmList?.length/10)}</TextColorSwitcher>
                                    <TextColorSwitcher>Total results: {totalResults}</TextColorSwitcher>
                                    {filmsPage?.map((movie, index) => 
                                    <View key = {movie._id} style = {Styles.searchResult}> 
                                        {movie?.poster != 'No poster' ? 
                                        <Image style={{height:230, width: 150}} source = {{uri: movie?.poster}} /> 
                                        : 
                                        <View style={{height:230, width:150, backgroundColor:'rgb(59, 57, 51)'}}>
                                            <TextColorSwitcher style={{textAlign: 'center', paddingTop:'25%'}}>No poster</TextColorSwitcher>
                                        </View>}                                
                                            <View style={Styles.searchResultsInfo}>
                                                <TextColorSwitcher style = {Styles.browseHeading}>{movie.title}</TextColorSwitcher>
                                                <TextColorSwitcher style = {{marginBottom: 15}}>Year released: <Text style = {{fontWeight:'bold'}}>{movie.year}</Text></TextColorSwitcher>
                                                {/* <Pressable
                                                    style={Styles.showMoreButtonSearchResults}
                                                    onPress={() => navigation.navigate('MovieDetails', {movieInfo: movie})}
                                                >
                                                    <Text style = {Styles.buttonText}>MORE INFO</Text>
                                                </Pressable> */}
                                                <ShowMoreButton navigation = {navigation} film = {movie} />
                                            </View>
                                        </View>
                                )}</View> 
                            )
                            : <TextColorSwitcher>{filmList}</TextColorSwitcher>
                    }
                </ScrollView>
                {totalPages != undefined && totalPages > 1 && (showNavigation && 
                <View style = {Styles.searchNavigation}>
                    <Pressable onPress={() => {setPage(page == 1 ? 1 : page-1); handleSearch(page === 1 ? page : page-1)}}>
                        <Text style = {Styles.buttonText}>Previous</Text>
                    </Pressable>
                    <Pressable onPress={() => {setPage(page == totalPages ? totalPages : page+1); handleSearch(page === totalPages ? page : page+1)}}>
                        <Text style = {Styles.buttonText}>Next</Text>
                    </Pressable>
                </View>)
                }
            </View>
        </>
    );
};

export default Search;