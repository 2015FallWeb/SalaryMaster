/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.salarymaster.model;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author chanllen
 */
public class Trie {
    private TrieNode root;

    public Trie() {
        root = new TrieNode();
        
    }

    // Inserts a word into the trie.
    public void insert(String word) {
        TrieNode cur = root;
        char[] chs = word.toCharArray();
        for(int i = 0;i < chs.length;i++){
            if(!cur.map.containsKey(chs[i])){
                TrieNode next = new TrieNode();
                cur.map.put(chs[i], next); 
                cur = next;
            }else{
                cur = cur.map.get(chs[i]);
            }
        }
        cur.isWord = true;
    }

    // Returns if the word is in the trie.
    public boolean search(String word) {
        char[] chs = word.toCharArray();
        TrieNode cur = root;
        for(int i = 0;i < chs.length;i++){
            if(!cur.map.containsKey(chs[i])){
                return false;
            }else{
                cur = cur.map.get(chs[i]);
            }
        }
        
        return cur.isWord;
    }

    // Returns if there is any word in the trie
    // that starts with the given prefix.
    public boolean startsWith(String prefix) {
        char[] chs = prefix.toCharArray();
        TrieNode cur = root;
        for(int i = 0;i < chs.length;i++){
            if(!cur.map.containsKey(chs[i])){
                return false;
            }else{
                cur = cur.map.get(chs[i]);
            }
        }
        
        return true;
    }
}

class TrieNode {
    // Initialize your data structure here.
    public boolean isWord = false;
    public Map<Character, TrieNode> map;
 
    public TrieNode() {
        map = new HashMap();
    }


}