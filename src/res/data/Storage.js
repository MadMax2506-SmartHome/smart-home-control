import AsyncStorage from '@react-native-community/async-storage';

// getter
export async function get_bool_entry(entry_name) {
  try {
    return await( AsyncStorage.getItem( entry_name ) );
  } catch (e) {
    console.log(e);
    return false
  }
}

export async function get_int_entry(entry_name) {
  try {
    return await( AsyncStorage.getItem( entry_name ) );
  } catch (e) {
    console.log(e);
    return 0
  }
}

export async function get_str_entry(entry_name) {
  try {
    return await( AsyncStorage.getItem( entry_name ) );
  } catch (e) {
    console.log(e);
    return false
  }
}

// setter
export async function set_entry(entry_name, entry_value) {
  try {
    await( AsyncStorage.setItem( entry_name, entry_value ) );
  } catch (e) {
    console.log(e);
  }
}

// delete
export async function delete_entry(entry_name) {
  try {
    await( AsyncStorage.removeItem( entry_name ) );
  } catch (e) {
    console.log(e);
  }
}
