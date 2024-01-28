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
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Use a unique key for each item
        numColumns={numColumns}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
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
