/**
 * ==============================================================================
 * SEARCHPROPERTIESSCREEN.TSX - REACT NATIVE CONVERSION ANNOTATIONS
 * ==============================================================================
 * 
 * PURPOSE: Property search with filters, recent searches, and results display
 * for finding insured properties in the San Francisco Bay Area.
 * 
 * ==============================================================================
 * REACT NATIVE CONVERSION REQUIREMENTS
 * ==============================================================================
 * 
 * 1. SEARCH INPUT:
 *    - TextInput with debounce (500ms) using lodash.debounce
 *    - Auto-complete suggestions
 *    - Search icon prefix
 *    - Clear button
 *    - Keyboard management
 * 
 * 2. FILTERS:
 *    - @gorhom/bottom-sheet for filter panel
 *    - Price range slider
 *    - Location picker (autocomplete)
 *    - Property type multi-select
 *    - Date range picker
 * 
 * 3. SEARCH RESULTS:
 *    - FlatList with PropertyCard components
 *    - Infinite scroll pagination
 *    - Empty state
 *    - Loading skeleton
 *    - Pull-to-refresh
 * 
 * 4. RECENT SEARCHES:
 *    - AsyncStorage for persistence
 *    - Max 10 recent searches
 *    - Clear all option
 * 
 * 5. AUTO-COMPLETE:
 *    - Google Places API integration
 *    - react-native-google-places-autocomplete
 *    - Debounced search suggestions
 * 
 * ==============================================================================
 * REQUIRED API ENDPOINTS
 * ==============================================================================
 * 
 * 1. GET /api/properties/search
 *    Query params: query, location, priceMin, priceMax, propertyType, page, limit
 *    Returns: Paginated property results
 * 
 * 2. GET /api/search/suggestions?query={query}
 *    Returns: Auto-complete suggestions
 * 
 * 3. POST /api/search/recent
 *    Body: { query, filters }
 *    Save recent search
 * 
 * 4. GET /api/search/recent
 *    Returns: User's recent searches
 * 
 * 5. DELETE /api/search/recent/:id
 *    Remove a recent search
 * 
 * ==============================================================================
 * TESTING CHECKLIST
 * ==============================================================================
 * 
 * - [ ] Search input works with debounce
 * - [ ] Auto-complete suggestions appear
 * - [ ] Results display correctly
 * - [ ] Infinite scroll pagination works
 * - [ ] Filters functional (bottom sheet)
 * - [ ] Recent searches saved
 * - [ ] Recent searches clickable
 * - [ ] Clear recent searches works
 * - [ ] Empty state displays
 * - [ ] Loading states work
 * - [ ] Pull-to-refresh functional
 * - [ ] Navigation to property details
 * - [ ] iOS and Android compatible
 * 
 */

// RN: Import React Native components
// RN: import { View, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView, Keyboard } from 'react-native';
// RN: import Animated, { FadeInDown } from 'react-native-reanimated';
// RN: import BottomSheet from '@gorhom/bottom-sheet';
// RN: import AsyncStorage from '@react-native-async-storage/async-storage';
// RN: import { debounce } from 'lodash';

// RN: Replace lucide-react with react-native-vector-icons
// RN: import Icon from 'react-native-vector-icons/Feather';
import { Search, MapPin, Filter, SlidersHorizontal } from "lucide-react";
import React from "react";

// RN: ==============================================================================
// RN: COMPONENT DEFINITION WITH HOOKS
// RN: ==============================================================================
export function SearchPropertiesScreen() {
  // RN: const navigation = useNavigation();
  // RN: const bottomSheetRef = useRef<BottomSheet>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  // RN: const [suggestions, setSuggestions] = React.useState([]);
  // RN: const [showSuggestions, setShowSuggestions] = React.useState(false);
  // RN: const [activeFilters, setActiveFilters] = React.useState({
  // RN:   priceMin: null,
  // RN:   priceMax: null,
  // RN:   propertyType: [],
  // RN:   location: null,
  // RN: });

  // RN: // TanStack Query for search results
  // RN: const { 
  // RN:   data: searchResults, 
  // RN:   isLoading, 
  // RN:   fetchNextPage, 
  // RN:   hasNextPage 
  // RN: } = useInfiniteQuery({
  // RN:   queryKey: ['propertySearch', searchQuery, activeFilters],
  // RN:   queryFn: ({ pageParam = 1 }) => 
  // RN:     propertyApi.search(searchQuery, activeFilters, pageParam),
  // RN:   getNextPageParam: (lastPage) => lastPage.nextPage,
  // RN:   enabled: searchQuery.length >= 3
  // RN: });
  // RN:
  // RN: // Recent searches from AsyncStorage
  // RN: const { data: recentSearches, refetch: refetchRecent } = useQuery({
  // RN:   queryKey: ['recentSearches'],
  // RN:   queryFn: async () => {
  // RN:     const stored = await AsyncStorage.getItem('recentSearches');
  // RN:     return stored ? JSON.parse(stored) : [];
  // RN:   }
  // RN: });
  // RN:
  // RN: // Debounced search handler
  // RN: const debouncedSearch = React.useCallback(
  // RN:   debounce(async (query) => {
  // RN:     if (query.length >= 3) {
  // RN:       const results = await propertyApi.getSuggestions(query);
  // RN:       setSuggestions(results);
  // RN:       setShowSuggestions(true);
  // RN:     } else {
  // RN:       setShowSuggestions(false);
  // RN:     }
  // RN:   }, 500),
  // RN:   []
  // RN: );
  // RN:
  // RN: // Save recent search
  // RN: const saveRecentSearch = async (query) => {
  // RN:   const recent = recentSearches || [];
  // RN:   const updated = [query, ...recent.filter(s => s !== query)].slice(0, 10);
  // RN:   await AsyncStorage.setItem('recentSearches', JSON.stringify(updated));
  // RN:   refetchRecent();
  // RN: };
  // RN:
  // RN: // Handle search submit
  // RN: const handleSearchSubmit = () => {
  // RN:   Keyboard.dismiss();
  // RN:   saveRecentSearch(searchQuery);
  // RN:   setShowSuggestions(false);
  // RN: };
  // RN:
  // RN: // Handle filter button
  // RN: const handleOpenFilters = () => {
  // RN:   bottomSheetRef.current?.expand();
  // RN: };
  // RN:
  // RN: // Handle recent search selection
  // RN: const handleRecentSearchSelect = (search) => {
  // RN:   setSearchQuery(search);
  // RN:   handleSearchSubmit();
  // RN: };

  const recentSearches = [
    'San Francisco condos',
    'Beachfront properties',
    'Properties under $2M',
  ];

  return (
    // RN: ROOT CONTAINER WITH KEYBOARD AVOIDING VIEW
    // RN: <SafeAreaView style={styles.container}>
    // RN:   <KeyboardAvoidingView
    // RN:     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    // RN:     style={styles.keyboardView}
    // RN:   >
    <div 
      className="w-full h-full flex flex-col"
      style={{ 
        padding: 'var(--spacing-6)',
        gap: 'var(--spacing-4)',
        paddingBottom: 'calc(var(--nav-height) + var(--spacing-8))'
      }}
    >
      {/* HEADER
       * RN: <View style={styles.header}>
       * RN:   <Text style={styles.title}>Search Properties</Text>
       * RN:   <Text style={styles.subtitle}>Find properties in your area</Text>
       * RN: </View>
       */}
      <div style={{ paddingTop: 'var(--spacing-2)' }}>
        <h1 style={{ color: 'var(--text-primary)', marginBottom: 'var(--spacing-2)' }}>
          Search Properties
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Find properties in your area
        </p>
      </div>

      {/* SEARCH BAR
       * RN: Search input with auto-complete and filter button
       * RN: <View style={styles.searchContainer}>
       * RN:   <View style={styles.searchBar}>
       * RN:     <Icon name="search" size={16} color={theme.colors.textSecondary} />
       * RN:     <TextInput
       * RN:       style={styles.searchInput}
       * RN:       value={searchQuery}
       * RN:       onChangeText={(text) => {
       * RN:         setSearchQuery(text);
       * RN:         debouncedSearch(text);
       * RN:       }}
       * RN:       placeholder="Search by address, city, or zip code..."
       * RN:       placeholderTextColor={theme.colors.textSecondary}
       * RN:       returnKeyType="search"
       * RN:       onSubmitEditing={handleSearchSubmit}
       * RN:       autoCapitalize="none"
       * RN:       autoCorrect={false}
       * RN:     />
       * RN:     {searchQuery.length > 0 && (
       * RN:       <TouchableOpacity onPress={() => setSearchQuery('')}>
       * RN:         <Icon name="x" size={16} color={theme.colors.textSecondary} />
       * RN:       </TouchableOpacity>
       * RN:     )}
       * RN:     <TouchableOpacity
       * RN:       style={styles.filterButton}
       * RN:       onPress={handleOpenFilters}
       * RN:     >
       * RN:       <Icon name="sliders" size={16} color="#3b82f6" />
       * RN:     </TouchableOpacity>
       * RN:   </View>
       * RN:   
       * RN:   // Auto-complete Suggestions
       * RN:   {showSuggestions && suggestions.length > 0 && (
       * RN:     <View style={styles.suggestionsContainer}>
       * RN:       {suggestions.map((suggestion, index) => (
       * RN:         <TouchableOpacity
       * RN:           key={index}
       * RN:           style={styles.suggestionItem}
       * RN:           onPress={() => {
       * RN:             setSearchQuery(suggestion.text);
       * RN:             handleSearchSubmit();
       * RN:           }}
       * RN:         >
       * RN:           <Icon name="map-pin" size={14} color={theme.colors.textSecondary} />
       * RN:           <Text style={styles.suggestionText}>{suggestion.text}</Text>
       * RN:         </TouchableOpacity>
       * RN:       ))}
       * RN:     </View>
       * RN:   )}
       * RN: </View>
       * RN:
       * RN: StyleSheet:
       * RN: searchContainer: {
       * RN:   position: 'relative',
       * RN: },
       * RN: searchBar: {
       * RN:   backgroundColor: theme.colors.glassBg,
       * RN:   borderRadius: 12,
       * RN:   borderWidth: 1,
       * RN:   borderColor: theme.colors.glassBorder,
       * RN:   padding: 12,
       * RN:   flexDirection: 'row',
       * RN:   alignItems: 'center',
       * RN:   gap: 8,
       * RN: },
       * RN: searchInput: {
       * RN:   flex: 1,
       * RN:   color: theme.colors.textPrimary,
       * RN:   fontSize: 16,
       * RN: }
       */}
      <div 
        className="backdrop-blur-md flex items-center"
        style={{
          backgroundColor: 'var(--glass-bg)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--glass-border)',
          padding: 'var(--spacing-3)',
          gap: 'var(--spacing-2)',
        }}
      >
        <Search className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by address, city, or zip code..."
          className="flex-1 bg-transparent outline-none"
          style={{ color: 'var(--text-primary)' }}
        />
        <button
          style={{
            padding: 'var(--spacing-2)',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
          }}
        >
          <SlidersHorizontal className="w-4 h-4" style={{ color: '#3b82f6' }} />
        </button>
      </div>

      {/* Filters */}
      <div className="flex" style={{ gap: 'var(--spacing-2)' }}>
        {['Residential', 'Commercial', 'High Value', 'Recent'].map((filter, index) => (
          <button
            key={index}
            className="backdrop-blur-md active:scale-95 transition-all"
            style={{
              backgroundColor: 'var(--glass-bg)',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--glass-border)',
              padding: 'var(--spacing-2) var(--spacing-3)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* RECENT SEARCHES
       * RN: Display and manage recent search history
       * RN: {!searchQuery && recentSearches?.length > 0 && (
       * RN:   <View style={styles.recentSection}>
       * RN:     <View style={styles.recentHeader}>
       * RN:       <Text style={styles.recentTitle}>Recent searches:</Text>
       * RN:       <TouchableOpacity onPress={handleClearRecent}>
       * RN:         <Text style={styles.clearText}>Clear all</Text>
       * RN:       </TouchableOpacity>
       * RN:     </View>
       * RN:     {recentSearches.map((search, index) => (
       * RN:       <Animated.View key={index} entering={FadeInDown.delay(index * 50)}>
       * RN:         <TouchableOpacity
       * RN:           style={styles.recentItem}
       * RN:           onPress={() => handleRecentSearchSelect(search)}
       * RN:         >
       * RN:           <Icon name="map-pin" size={16} color={theme.colors.textSecondary} />
       * RN:           <Text style={styles.recentText}>{search}</Text>
       * RN:           <Icon name="arrow-up-left" size={14} color={theme.colors.textSecondary} />
       * RN:         </TouchableOpacity>
       * RN:       </Animated.View>
       * RN:     ))}
       * RN:   </View>
       * RN: )}
       * RN:
       * RN: // Search Results
       * RN: {searchQuery.length >= 3 && (
       * RN:   <FlatList
       * RN:     data={searchResults?.pages.flatMap(page => page.results) || []}
       * RN:     keyExtractor={(item) => item.id}
       * RN:     renderItem={({ item }) => (
       * RN:       <PropertyCard
       * RN:         property={item}
       * RN:         onPress={() => navigation.navigate('PropertyDetails', { propertyId: item.id })}
       * RN:       />
       * RN:     )}
       * RN:     contentContainerStyle={styles.resultsList}
       * RN:     ListEmptyComponent={
       * RN:       isLoading ? <LoadingSkeleton /> : <EmptyState message="No properties found" />
       * RN:     }
       * RN:     onEndReached={() => {
       * RN:       if (hasNextPage) fetchNextPage();
       * RN:     }}
       * RN:     onEndReachedThreshold={0.5}
       * RN:     refreshControl={
       * RN:       <RefreshControl refreshing={isLoading} onRefresh={() => {}} />
       * RN:     }
       * RN:   />
       * RN: )}
       * RN:
       * RN: // Filter Bottom Sheet
       * RN: <BottomSheet
       * RN:   ref={bottomSheetRef}
       * RN:   index={-1}
       * RN:   snapPoints={['50%', '90%']}
       * RN:   enablePanDownToClose
       * RN: >
       * RN:   <View style={styles.filterContent}>
       * RN:     <Text style={styles.filterTitle}>Filters</Text>
       * RN:     
       * RN:     // Price Range
       * RN:     <View style={styles.filterSection}>
       * RN:       <Text style={styles.filterLabel}>Price Range</Text>
       * RN:       <MultiSlider
       * RN:         values={[activeFilters.priceMin || 0, activeFilters.priceMax || 5000000]}
       * RN:         onValuesChange={(values) => {
       * RN:           setActiveFilters(prev => ({
       * RN:             ...prev,
       * RN:             priceMin: values[0],
       * RN:             priceMax: values[1]
       * RN:           }));
       * RN:         }}
       * RN:         min={0}
       * RN:         max={5000000}
       * RN:         step={50000}
       * RN:       />
       * RN:     </View>
       * RN:     
       * RN:     // Property Type
       * RN:     <View style={styles.filterSection}>
       * RN:       <Text style={styles.filterLabel}>Property Type</Text>
       * RN:       <View style={styles.filterChips}>
       * RN:         {['Residential', 'Commercial', 'Multi-Family', 'Land'].map(type => (
       * RN:           <TouchableOpacity
       * RN:             key={type}
       * RN:             style={[
       * RN:               styles.filterChip,
       * RN:               activeFilters.propertyType.includes(type) && styles.filterChipActive
       * RN:             ]}
       * RN:             onPress={() => {
       * RN:               setActiveFilters(prev => ({
       * RN:                 ...prev,
       * RN:                 propertyType: prev.propertyType.includes(type)
       * RN:                   ? prev.propertyType.filter(t => t !== type)
       * RN:                   : [...prev.propertyType, type]
       * RN:               }));
       * RN:             }}
       * RN:           >
       * RN:             <Text style={styles.filterChipText}>{type}</Text>
       * RN:           </TouchableOpacity>
       * RN:         ))}
       * RN:       </View>
       * RN:     </View>
       * RN:     
       * RN:     // Apply Button
       * RN:     <TouchableOpacity
       * RN:       style={styles.applyButton}
       * RN:       onPress={() => bottomSheetRef.current?.close()}
       * RN:     >
       * RN:       <Text style={styles.applyButtonText}>Apply Filters</Text>
       * RN:     </TouchableOpacity>
       * RN:   </View>
       * RN: </BottomSheet>
       */}
      <div>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 'var(--spacing-2)' }}>
          Recent searches:
        </div>
        <div className="flex flex-col" style={{ gap: 'var(--spacing-2)' }}>
          {recentSearches.map((search, index) => (
            <button
              key={index}
              className="backdrop-blur-md active:scale-98 transition-all flex items-center"
              style={{
                backgroundColor: 'var(--glass-bg)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--glass-border)',
                padding: 'var(--spacing-3)',
                gap: 'var(--spacing-2)',
                textAlign: 'left',
              }}
            >
              <MapPin className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
              <span style={{ color: 'var(--text-primary)' }}>{search}</span>
            </button>
          ))}
        </div>
      </div>
      {/* RN: </KeyboardAvoidingView> */}
      {/* RN: </SafeAreaView> */}
    </div>
  );
}

// RN: ==============================================================================
// RN: COMPLETE REACT NATIVE STYLESHEET EXAMPLE
// RN: ==============================================================================
// RN:
// RN: import { StyleSheet, Platform } from 'react-native';
// RN:
// RN: const styles = StyleSheet.create({
// RN:   container: {
// RN:     flex: 1,
// RN:     backgroundColor: theme.colors.bgPrimary,
// RN:   },
// RN:   keyboardView: {
// RN:     flex: 1,
// RN:   },
// RN:   content: {
// RN:     padding: 24,
// RN:     gap: 16,
// RN:     paddingBottom: 120,
// RN:   },
// RN:   header: {
// RN:     paddingTop: 8,
// RN:     gap: 8,
// RN:   },
// RN:   title: {
// RN:     color: theme.colors.textPrimary,
// RN:     fontSize: 28,
// RN:     fontWeight: 'bold',
// RN:   },
// RN:   subtitle: {
// RN:     color: theme.colors.textSecondary,
// RN:     fontSize: 16,
// RN:   },
// RN:   searchContainer: {
// RN:     position: 'relative',
// RN:   },
// RN:   searchBar: {
// RN:     backgroundColor: theme.colors.glassBg,
// RN:     borderRadius: 12,
// RN:     borderWidth: 1,
// RN:     borderColor: theme.colors.glassBorder,
// RN:     padding: 12,
// RN:     flexDirection: 'row',
// RN:     alignItems: 'center',
// RN:     gap: 8,
// RN:   },
// RN:   searchInput: {
// RN:     flex: 1,
// RN:     color: theme.colors.textPrimary,
// RN:     fontSize: 16,
// RN:   },
// RN:   filterButton: {
// RN:     padding: 8,
// RN:     borderRadius: 8,
// RN:     backgroundColor: 'rgba(59, 130, 246, 0.1)',
// RN:   },
// RN:   suggestionsContainer: {
// RN:     position: 'absolute',
// RN:     top: 60,
// RN:     left: 0,
// RN:     right: 0,
// RN:     backgroundColor: theme.colors.glassBg,
// RN:     borderRadius: 12,
// RN:     borderWidth: 1,
// RN:     borderColor: theme.colors.glassBorder,
// RN:     maxHeight: 200,
// RN:     zIndex: 10,
// RN:     elevation: 5,
// RN:   },
// RN:   suggestionItem: {
// RN:     flexDirection: 'row',
// RN:     alignItems: 'center',
// RN:     gap: 8,
// RN:     padding: 12,
// RN:     borderBottomWidth: 1,
// RN:     borderBottomColor: theme.colors.glassBorder,
// RN:   },
// RN:   suggestionText: {
// RN:     color: theme.colors.textPrimary,
// RN:     fontSize: 14,
// RN:   },
// RN:   filterChipsContainer: {
// RN:     flexDirection: 'row',
// RN:     gap: 8,
// RN:   },
// RN:   filterChip: {
// RN:     backgroundColor: theme.colors.glassBg,
// RN:     borderRadius: 20,
// RN:     borderWidth: 1,
// RN:     borderColor: theme.colors.glassBorder,
// RN:     paddingVertical: 8,
// RN:     paddingHorizontal: 12,
// RN:   },
// RN:   filterChipActive: {
// RN:     backgroundColor: 'rgba(59, 130, 246, 0.2)',
// RN:     borderColor: '#3b82f6',
// RN:   },
// RN:   recentSection: {
// RN:     gap: 8,
// RN:   },
// RN:   recentHeader: {
// RN:     flexDirection: 'row',
// RN:     justifyContent: 'space-between',
// RN:     alignItems: 'center',
// RN:   },
// RN:   recentTitle: {
// RN:     color: theme.colors.textSecondary,
// RN:     fontSize: 14,
// RN:   },
// RN:   clearText: {
// RN:     color: theme.colors.info,
// RN:     fontSize: 14,
// RN:   },
// RN:   recentItem: {
// RN:     backgroundColor: theme.colors.glassBg,
// RN:     borderRadius: 12,
// RN:     borderWidth: 1,
// RN:     borderColor: theme.colors.glassBorder,
// RN:     padding: 12,
// RN:     flexDirection: 'row',
// RN:     alignItems: 'center',
// RN:     gap: 8,
// RN:   },
// RN:   recentText: {
// RN:     flex: 1,
// RN:     color: theme.colors.textPrimary,
// RN:     fontSize: 14,
// RN:   },
// RN:   resultsList: {
// RN:     gap: 12,
// RN:     paddingBottom: 20,
// RN:   },
// RN:   filterContent: {
// RN:     padding: 24,
// RN:     gap: 20,
// RN:   },
// RN:   filterTitle: {
// RN:     fontSize: 24,
// RN:     fontWeight: 'bold',
// RN:     color: theme.colors.textPrimary,
// RN:   },
// RN:   filterSection: {
// RN:     gap: 12,
// RN:   },
// RN:   filterLabel: {
// RN:     fontSize: 16,
// RN:     fontWeight: '600',
// RN:     color: theme.colors.textPrimary,
// RN:   },
// RN:   applyButton: {
// RN:     backgroundColor: theme.colors.info,
// RN:     borderRadius: 12,
// RN:     padding: 16,
// RN:     alignItems: 'center',
// RN:   },
// RN:   applyButtonText: {
// RN:     color: '#ffffff',
// RN:     fontSize: 16,
// RN:     fontWeight: '600',
// RN:   },
// RN: });
