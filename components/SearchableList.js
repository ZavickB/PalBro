import React, { useState, useEffect } from 'react';
import { FlatList, Text, TextInput, View, StyleSheet } from 'react-native';

const SearchableList = ({ data, renderItem, emptyStateText, numColumns }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    filterData(searchText);
  }, [searchText]);

  const filterData = (text) => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search..."
        style={styles.searchInput}
        onChangeText={setSearchText}
        value={searchText}
      />
      {filteredData.length === 0 && <Text style={styles.emptyState}>{emptyStateText}</Text>}
        <View style={styles.listContainer}>
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.key}`} // Use a combination of key and variant as a unique key
            numColumns={numColumns}
          />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  emptyState: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
});

export default SearchableList;
