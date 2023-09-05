import React, { useState, useEffect, useContext, useRef }  from 'react';
import { Text, View, Pressable, SafeAreaView, Image, ScrollView, FlatList, Dimensions} from 'react-native';
import Styles from '../../assets/styles';
import TextColorSwitcher from '../../components/TextColorSwitcher';
import Menu from '../../components/Menu';
import { ThemeContext } from '../../context/ThemeContext';
import FilmListPreview from '../../components/FilmListPreview'
 
export default function Main({navigation, route}: any) {
    const [popularInFocus, setPopularInFocus] = useState<Boolean>(false)
    const [highestRatedInFocus, setHighestRatedInFocus] = useState<Boolean>(false)
    const [upcomingInFocus, setUpcomingInFocus] = useState<Boolean>(false)

    let theme = useContext(ThemeContext)

    return (
        <>
        <Menu navigation = {navigation} />
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={[Styles.container, {backgroundColor: theme?.getColorTheme() == 'dark' ? '#1c1d1f' : 'white'}]}>
                        <View style = {{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <TextColorSwitcher style = {Styles.browseScreenHeader}>Popular Films </TextColorSwitcher>
                                {/* <LoadingAnimation message = 'Loading films'/> */}
                                <Pressable onFocus={()=>{setPopularInFocus(true)}} onBlur = {()=>{setPopularInFocus(false)}} onPress={() => navigation.navigate('FullCategoryScreen', {query: 'popular', title: 'Popular films'})}>
                                        <View style = {{borderWidth: popularInFocus ? 1: 0, borderColor: popularInFocus && 'red', alignContent: 'flex-end'}}>
                                                <TextColorSwitcher>
                                                        <Text style={Styles.browseScreenLink}>
                                                                (View more)
                                                        </Text>
                                                </TextColorSwitcher>
                                        </View>
                                </Pressable>
                        </View>
                        <FilmListPreview query = 'popular' navigation = {navigation} />
                        <View style = {{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <TextColorSwitcher style = {Styles.browseScreenHeader}>Highest-rated Films </TextColorSwitcher>
                                <Pressable onFocus={()=>{setHighestRatedInFocus(true)}} onBlur = {()=>{setHighestRatedInFocus(false)}}>
                                        <View style = {{borderWidth: highestRatedInFocus ? 1: 0, borderColor: highestRatedInFocus && 'red', alignContent: 'flex-end'}}>
                                                <TextColorSwitcher>
                                                        <Text style={Styles.browseScreenLink} onPress={() => navigation.navigate('FullCategoryScreen', {query: 'highestrated', title: 'Highest-rated Films'})}>
                                                                (View more)
                                                        </Text>
                                                </TextColorSwitcher>
                                        </View>
                                </Pressable>
                        </View>
                        <FilmListPreview query = 'highestrated' navigation = {navigation}/>
                        <View style = {{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <TextColorSwitcher style = {Styles.browseScreenHeader}>Upcoming Films </TextColorSwitcher>
                                <Pressable onFocus={()=>{setUpcomingInFocus(true)}} onBlur = {()=>{setUpcomingInFocus(false)}}>
                                        <View style = {{borderWidth: upcomingInFocus ? 1: 0, borderColor: upcomingInFocus && 'red', alignContent: 'flex-end'}}>
                                                <TextColorSwitcher>
                                                        <Text style={Styles.browseScreenLink} onPress={() => navigation.navigate('FullCategoryScreen', {query: 'upcoming', title: 'Upcoming films'})}>
                                                                (View more)
                                                        </Text>
                                                </TextColorSwitcher>
                                        </View>
                                </Pressable>
                        </View>
                        <FilmListPreview query = 'upcoming' navigation = {navigation}/>
                </ScrollView>
        </>
    );
};